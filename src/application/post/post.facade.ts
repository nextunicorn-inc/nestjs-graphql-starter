import { Injectable } from '@nestjs/common';
import { PostService } from '~/domain/post/post.service';
import { WritePostRequest } from '~/interfaces/@request/writePost.request';
import { AddReactionRequest } from '~/interfaces/@request/addReaction.request';
import { DeleteReactionRequest } from '~/interfaces/@request/deleteReaction.request';
import { SocialService } from '~/domain/social/social.service';
import { Result } from '@leejuyoung/result';

@Injectable()
export class PostFacade {
  constructor(
    private readonly postService: PostService,
    private readonly socialService: SocialService,
  ) {}

  async findPostsByUserId(userId: number) {
    return this.postService.findAllByUserIdsOrderByIdDesc([userId]);
  }
  async findFollowingPostsByUserId(userId: number) {
    const followingUserIdsRet =
      await this.socialService.findFollowingIdsByUserIds(userId);
    if (followingUserIdsRet.isFailure()) {
      return Result.failure(followingUserIdsRet.exception());
    }
    const followingUserIds = followingUserIdsRet.getOrThrow();

    return this.postService.findAllByUserIdsOrderByIdDesc(followingUserIds);
  }

  async writePost(userId: number, writePostRequest: WritePostRequest) {
    return this.postService.createPost({
      title: writePostRequest.title,
      description: writePostRequest.description,
      userId,
    });
  }
  async react(userId: number, addReactionRequest: AddReactionRequest) {
    return this.postService.createReaction({
      userId,
      ...addReactionRequest,
    });
  }
  async undoReact(
    userId: number,
    deleteReactionRequest: DeleteReactionRequest,
  ) {
    return this.postService.deleteReaction({
      userId,
      postId: deleteReactionRequest.postId,
    });
  }
}
