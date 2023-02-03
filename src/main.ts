import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { ValidationPipe } from '@nestjs/common';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { MainExceptionFilter } from '~/mainExceptionFilter';

async function bootstrap() {
  // https://github.com/odavid/typeorm-transactional-cls-hooked
  // https://medium.com/trabe/continuation-local-storage-for-easy-context-passing-in-node-js-2461c2120284
  initializeTransactionalContext(); // Initialize cls-hooked
  patchTypeORMRepositoryWithBaseRepository(); // patch Repository with BaseRepository.
  const app = await NestFactory.create(MainModule);
  // https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());
  // https://docs.nestjs.com/exception-filters#exception-filters-1
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new MainExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
