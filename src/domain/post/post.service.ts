import { Injectable } from '@nestjs/common';
import { PostRepository } from '~/domain/post/repository/post.repository';
import { Result } from '@leejuyoung/result';
import { PostWithReactionsDto } from '~/domain/post/dto/postWithReactionsDto';
import { PostReactionRepository } from '~/domain/post/repository/postReaction.repository';
import { In } from 'typeorm';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';
import {
  PostCreationType,
  PostReactionCreationType,
  PostReactionDeletionType,
} from '~/domain/post/types';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postReactionRepository: PostReactionRepository,
  ) {}

  findOne(id: number) {
    return this.postRepository.findOne({
      id,
    });
  }
  async findAllByUserIdsOrderByIdDesc(
    userIds: number[],
  ): Promise<Result<PostWithReactionsDto[]>> {
    const postsResult = await this.postRepository.findMany({
      where: {
        userId: In(userIds),
      },
    });
    if (postsResult.isFailure()) {
      return Result.failure(postsResult.exception());
    }

    const posts = postsResult.getOrThrow();

    const reactionsResult = await this.postReactionRepository.findMany({
      where: {
        postId: In(posts.map((v) => v.id)),
      },
    });
    if (reactionsResult.isFailure()) {
      return Result.failure(reactionsResult.exception());
    }
    const reactionsGroupByPostId = reactionsResult
      .getOrThrow()
      .reduce((acc, reaction) => {
        if (!acc[reaction.postId]) {
          acc[reaction.postId] = [];
        }
        acc[reaction.postId].push(reaction);
        return acc;
      }, {} as Record<number, PostReactionDto[]>);

    return Result.success(
      posts.map((post) => {
        const dto = new PostWithReactionsDto();
        dto.post = post;
        dto.reactions = reactionsGroupByPostId[post.id] || [];
        return dto;
      }),
    );
  }
  async createPost(postCreationType: PostCreationType) {
    return this.postRepository.create({
      title: postCreationType.title,
      description: postCreationType.description,
      userId: postCreationType.userId,
    });
  }
  async createReaction(postReactionCreationType: PostReactionCreationType) {
    return this.postReactionRepository.create({
      postId: postReactionCreationType.postId,
      userId: postReactionCreationType.userId,
      reaction: postReactionCreationType.reaction,
    });
  }
  async deleteReaction(postReactionDeletionType: PostReactionDeletionType) {
    return this.postReactionRepository.delete({
      postId: postReactionDeletionType.postId,
      userId: postReactionDeletionType.userId,
    });
  }
}
