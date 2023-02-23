// import {
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { UserGraph } from '~/interfaces/@graph/user.graph';
// import { UserFacade } from '~/application/user/user.facade';
// import { UserId } from '~/interfaces/@decorator/userId.decorator';
// import { UserFollowFacade } from '~/application/user/userFollow.facade';
// import { UserOnly } from '~/interfaces/@decorator/userOnly';
// import { SocialFacade } from '~/application/social/social.facade';
// import { ParamInt } from '~/interfaces/@decorator/paramInt.decorator';
//
// @Controller('users')
// @ApiTags('users')
// export class UsersOtherController {
//   constructor(
//     private readonly userFacade: UserFacade,
//     private readonly userFollowFacade: UserFollowFacade,
//     private readonly socialFacade: SocialFacade,
//   ) {}
//
//   @Get('/:id')
//   @HttpCode(HttpStatus.OK)
//   async one(@ParamInt('id') id: number): Promise<UserGraph> {
//     return UserGraph.of(
//       await this.userFacade.findOneById(id).then((v) => v.getOrThrow()),
//     );
//   }
//
//   @Get('/:id/followers')
//   @HttpCode(HttpStatus.OK)
//   async otherFollowers(@ParamInt('id') userId: number): Promise<UserGraph[]> {
//     return this.userFollowFacade
//       .findFollowerUsersByUserId(userId)
//       .then((ret) => ret.getOrThrow())
//       .then((users) => {
//         return users.map((user) => UserGraph.of(user));
//       });
//   }
//
//   @Get('/:id/followings')
//   @HttpCode(HttpStatus.OK)
//   async otherFollowings(@ParamInt('id') userId: number): Promise<UserGraph[]> {
//     return this.userFollowFacade
//       .findFollowingUsersByUserId(userId)
//       .then((ret) => ret.getOrThrow())
//       .then((users) => {
//         return users.map((user) => UserGraph.of(user));
//       });
//   }
//
//   @Post('/:id/followings')
//   @UserOnly()
//   @HttpCode(HttpStatus.CREATED)
//   async follow(
//     @UserId() meId: number,
//     @ParamInt('id') userId: number,
//   ): Promise<boolean> {
//     await this.socialFacade.follow(meId, userId).then((v) => v.getOrThrow());
//     return true;
//   }
//
//   @Delete('/:id/followings')
//   @UserOnly()
//   @HttpCode(HttpStatus.OK)
//   async unfollow(
//     @UserId() meId: number,
//     @ParamInt('id') userId: number,
//   ): Promise<boolean> {
//     await this.socialFacade.unfollow(meId, userId).then((v) => v.getOrThrow());
//     return true;
//   }
// }
