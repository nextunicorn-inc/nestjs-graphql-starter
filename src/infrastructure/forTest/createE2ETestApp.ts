import { Test } from '@nestjs/testing';
import { GraphqlModule } from '~/interfaces/graphql.module';
import { ValidationPipe } from '@nestjs/common';
import { MainExceptionFilter } from '~/@shared/errors/mainException.filter';
import { TestConfigureModule } from '~/infrastructure/forTest/testConfigurationModule';
import { InMemoryTypeOrmModule } from '~/infrastructure/forTest/inMemoryTypeOrmModule';

export const createE2ETestApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [TestConfigureModule, InMemoryTypeOrmModule, GraphqlModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());
  // https://docs.nestjs.com/exception-filters#exception-filters-1
  app.useGlobalFilters(new MainExceptionFilter());
  await app.init();
  return app;
};
