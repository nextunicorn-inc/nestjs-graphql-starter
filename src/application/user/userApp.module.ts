import { Module } from '@nestjs/common';
import { UserDomainModule } from '~/domain/user/userDomain.module';
import { UserFacade } from '~/application/user/user.facade';
import { AuthModule } from '~/domain/auth/auth.module';

@Module({
  imports: [UserDomainModule, AuthModule],
  exports: [UserFacade],
  providers: [UserFacade],
})
export class UserAppModule {}
