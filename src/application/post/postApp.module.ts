import { Module } from '@nestjs/common';
import { PostFacade } from '~/application/post/post.facade';
import { PostDomainModule } from '~/domain/post/postDomain.module';
import { SocialDomainModule } from '~/domain/social/socialDomain.module';

@Module({
  imports: [PostDomainModule, SocialDomainModule],
  exports: [PostFacade],
  providers: [PostFacade],
})
export class PostAppModule {}
