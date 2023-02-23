import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { GraphqlModule } from './interfaces/graphql.module';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';

@Module({
  imports: [ConfigureModule, DatabaseModule, GraphqlModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
