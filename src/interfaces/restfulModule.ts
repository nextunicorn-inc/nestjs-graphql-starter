import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from '~/interfaces/common/healthCheck.controller';
import { UserAppModule } from '~/application/user/userApp.module';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '~/application/user/accessToken.strategy';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';
import { AuthController } from '~/interfaces/auth/auth.controller';
import { PostAppModule } from '~/application/post/postApp.module';
import { SocialAppModule } from '~/application/social/socialApp.module';
import { UserOneController } from '~/interfaces/user/userOne.controller';

const appModules: ModuleMetadata['imports'] = [
  UserAppModule,
  PostAppModule,
  SocialAppModule,
];

@Module({
  imports: [
    ...appModules,
    ConfigureModule,
    TerminusModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AccessTokenStrategy],
  controllers: [
    UsersController,
    HealthCheckController,
    UserOneController,
    AuthController,
  ],
})
export class RestfulModule {}
