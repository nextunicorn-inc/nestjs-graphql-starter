import './infrastructure/utils/monkey-patch';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { MainExceptionFilter } from '~/@shared/errors/mainException.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validatorErrorFactory } from '~/@shared/errors/validatorError.factory';

async function bootstrap() {
  // https://github.com/odavid/typeorm-transactional-cls-hooked
  // https://medium.com/trabe/continuation-local-storage-for-easy-context-passing-in-node-js-2461c2120284
  initializeTransactionalContext(); // Initialize cls-hooked
  patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.
  const app = await NestFactory.create(MainModule);
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validatorErrorFactory,
    }),
  );
  // https://docs.nestjs.com/exception-filters#exception-filters-1
  app.useGlobalFilters(new MainExceptionFilter());

  // https://docs.nestjs.com/security/cors
  app.enableCors();

  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter')
    .setDescription('Example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
