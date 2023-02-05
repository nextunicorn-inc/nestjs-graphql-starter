import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '~/interfaces/@response/user.response';
import { UserFacade } from '~/application/user/user.facade';
import { UserOnly } from '~/interfaces/@decorator/userOnly';
import { UserFollowFacade } from '~/application/user/userFollow.facade';
import { UserId } from '~/interfaces/@decorator/userId';
import { SocialFacade } from '~/application/social/social.facade';

@Controller('users/:id')
@ApiTags('users')
export class UserOneController {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly userFollowFacade: UserFollowFacade,
    private readonly socialFacade: SocialFacade,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async one(@Param('id') id: string): Promise<UserResponse> {
    return UserResponse.of(
      await this.userFacade
        .findOneById(Number.parseInt(id, 10))
        .then((v) => v.getOrThrow()),
    );
  }

  @Get('followers')
  @HttpCode(HttpStatus.OK)
  async myFollowers(@Param('id') userId: string): Promise<UserResponse[]> {
    return this.userFollowFacade
      .findFollowerUsersByUserId(Number.parseInt(userId, 10))
      .then((ret) => ret.getOrThrow())
      .then((users) => {
        return users.map((user) => UserResponse.of(user));
      });
  }

  @Get('followings')
  @HttpCode(HttpStatus.OK)
  async myFollowings(@Param('id') userId: string): Promise<UserResponse[]> {
    return this.userFollowFacade
      .findFollowingUsersByUserId(Number.parseInt(userId, 10))
      .then((ret) => ret.getOrThrow())
      .then((users) => {
        return users.map((user) => UserResponse.of(user));
      });
  }

  @Post('followings')
  @UserOnly()
  @HttpCode(HttpStatus.CREATED)
  async follow(
    @UserId() meId: number,
    @Param('id') userId: string,
  ): Promise<boolean> {
    await this.socialFacade
      .follow(meId, Number.parseInt(userId, 10))
      .then((v) => v.getOrThrow());
    return true;
  }

  @Post('followings')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  async unfollow(
    @UserId() meId: number,
    @Param('id') userId: string,
  ): Promise<boolean> {
    await this.socialFacade
      .unfollow(meId, Number.parseInt(userId, 10))
      .then((v) => v.getOrThrow());
    return true;
  }
}
