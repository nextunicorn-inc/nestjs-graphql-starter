import { Injectable } from '@nestjs/common';
import { SocialService } from '~/domain/social/social.service';
import { Result } from '@leejuyoung/result';

@Injectable()
export class UserFollowFacade {
  constructor(private readonly socialService: SocialService) {}

  async findFollowingIdsByUserId(userId: number) {
    const result = await this.socialService.findFollowingIdsByUserIds(userId);

    if (result.isFailure()) {
      return Result.failure(result.exception());
    }

    return result;
  }

  async findFollowerIdsByUserId(userId: number) {
    const result = await this.socialService.findFollowerIdsByUserId(userId);

    if (result.isFailure()) {
      return Result.failure(result.exception());
    }

    return result;
  }
}
