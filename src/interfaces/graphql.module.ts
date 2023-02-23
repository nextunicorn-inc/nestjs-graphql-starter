import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from '~/interfaces/common/healthCheck.controller';
import { UserAppModule } from '~/application/user/userApp.module';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '~/application/user/accessToken.strategy';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';
import { PostAppModule } from '~/application/post/postApp.module';
import { SocialAppModule } from '~/application/social/socialApp.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'process';
import * as DataLoader from 'dataloader';
import { ModuleRef } from '@nestjs/core';
import { BaseDataloaderDelegate } from '~/interfaces/@dataloader/baseDataloader.delegate';
import { UserDataloaderDelegate } from '~/interfaces/@dataloader/user.dataloader.delegate';
import { UsersResolver } from '~/interfaces/user/users.resolver';
import { UsersMutation } from '~/interfaces/user/users.mutation';
import { GqlError } from '~/@shared/errors/gqlError';

const dataLoaders = [UserDataloaderDelegate];

const resolvers = [UsersResolver, UsersMutation];
const appModules: ModuleMetadata['imports'] = [
  UserAppModule,
  PostAppModule,
  SocialAppModule,
];

@Module({
  imports: [...appModules],
  providers: dataLoaders,
  exports: dataLoaders,
})
class DataLoaderModule {}

@Module({
  imports: [
    ...appModules,
    DataLoaderModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [...appModules, DataLoaderModule],
      inject: [ModuleRef],
      useFactory: (moduleRef: ModuleRef) => {
        return {
          formatError: (graphQLError) => {
            return new GqlError(graphQLError).toGraphQLError();
          },
          debug: process.env.NODE_ENV !== 'production',
          playground: process.env.NODE_ENV !== 'production',
          autoSchemaFile: true,
          sortSchema: true,
          context: () => {
            const dataLoaders: Record<string, DataLoader<any, any>> = {};
            return {
              dataLoaders,
              getDataLoader: <Key extends string | number, Value>(
                Cls: typeof BaseDataloaderDelegate<Key, Value>,
              ): DataLoader<Key, Value> => {
                if (dataLoaders[Cls.name]) {
                  return dataLoaders[Cls.name];
                }
                dataLoaders[Cls.name] = new DataLoader<Key, Value>(
                  async (keys) => {
                    // https://github.com/nestjs/nest/issues/832#issuecomment-407536316
                    return moduleRef
                      .get(Cls, { strict: false })
                      .newInst()
                      .loadMany(keys);
                  },
                );
                return dataLoaders[Cls.name];
              },
            };
          },
        };
      },
    }),
    ConfigureModule,
    TerminusModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AccessTokenStrategy, ...resolvers],
  controllers: [HealthCheckController],
})
export class GraphqlModule {}
