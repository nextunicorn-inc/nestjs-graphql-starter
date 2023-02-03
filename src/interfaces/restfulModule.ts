import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from '~/interfaces/common/healthCheck.controller';
import { UserAppModule } from '~/application/user/userApp.module';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '~/interfaces/accessToken.strategy';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { ConfigureModule } from '~/infrastructure/configure/configure.module';
import { AuthController } from '~/interfaces/auth/auth.controller';

const appModules: ModuleMetadata['imports'] = [UserAppModule];

@Module({
  imports: [
    ...appModules,
    ConfigureModule,
    TerminusModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AccessTokenStrategy],
  controllers: [UsersController, HealthCheckController, AuthController],
})
export class RestfulModule {}
