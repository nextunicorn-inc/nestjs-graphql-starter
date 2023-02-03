import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { RestfulModule } from '~/interfaces/restfulModule';
import { InMemoryTypeOrmModule } from '~/infrastructure/utils/forTest/inMemoryTypeOrmModule';
import * as request from 'supertest';
import { TestConfigureModule } from '~/infrastructure/utils/forTest/testConfigurationModule';
import * as assert from 'assert';
import { MainExceptionFilter } from '~/mainExceptionFilter';
import { HttpAdapterHost } from '@nestjs/core';

describe('UsersController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [TestConfigureModule, InMemoryTypeOrmModule, RestfulModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // https://docs.nestjs.com/techniques/validation#auto-validation
    app.useGlobalPipes(new ValidationPipe());
    // https://docs.nestjs.com/exception-filters#exception-filters-1
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new MainExceptionFilter(httpAdapter));
    await app.init();
  });

  describe('user login test', () => {
    let accessToken: string;
    it('POST /users', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(201));
    it('POST /users (409)', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(409));
    it('POST /users (400)', () =>
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test2@nextunicorn.kr',
          password: '1234',
        })
        .expect(400));

    it('POST /auth/sessions', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sessions')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password',
        })
        .expect(201);
      accessToken = response.body.accessToken;
    });

    it('POST /auth/sessions (400)', async () => {
      await request(app.getHttpServer())
        .post('/auth/sessions')
        .send({
          email: 'test@nextunicorn.kr',
          password: 'password222',
        })
        .expect(400);
    });

    it('GET /users/me', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set({ Authorization: `Bearer ${accessToken}` })
        .expect(200);
      assert.equal(response.body.email, 'test@nextunicorn.kr');
    });
    it('GET /users/me (401)', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });
  });

  afterAll(() => app.close());
});
