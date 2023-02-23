// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { CreateUserRequest } from '~/interfaces/@request/createUser.request';
// import { UserGraph } from '~/interfaces/@graph/user.graph';
// import { UserFacade } from '~/application/user/user.facade';
// import { User } from '~/interfaces/@decorator/user.decorator';
// import { UserDto } from '~/domain/user/dto/user.dto';
// import { UserId } from '~/interfaces/@decorator/userId.decorator';
// import { UserFollowFacade } from '~/application/user/userFollow.facade';
// import { UserOnly } from '~/interfaces/@decorator/userOnly';
//
// @Controller('users')
// @ApiTags('users')
// export class UsersMeController {
//   constructor(
//     private readonly userFacade: UserFacade,
//     private readonly userFollowFacade: UserFollowFacade,
//   ) {}
//
//   @Get('/me')
//   @UserOnly()
//   @HttpCode(HttpStatus.OK)
//   async me(@User() user: UserDto): Promise<UserGraph> {
//     return UserGraph.of(user);
//   }
//
//   @Get('/me/followers')
//   @UserOnly()
//   @HttpCode(HttpStatus.OK)
//   async myFollowers(@UserId() userId: number): Promise<UserGraph[]> {
//     return await this.userFollowFacade
//       .findFollowerUsersByUserId(userId)
//       .then((ret) => ret.getOrThrow())
//       .then((users) => {
//         return users.map((user) => UserGraph.of(user));
//       });
//   }
//
//   @Get('/me/followings')
//   @UserOnly()
//   @HttpCode(HttpStatus.OK)
//   async myFollowings(@UserId() userId: number): Promise<UserGraph[]> {
//     return await this.userFollowFacade
//       .findFollowingUsersByUserId(userId)
//       .then((ret) => ret.getOrThrow())
//       .then((users) => {
//         return users.map((user) => UserGraph.of(user));
//       });
//   }
//
//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   async createUser(
//     @Body() createUserDto: CreateUserRequest,
//   ): Promise<UserGraph> {
//     const result = await this.userFacade.register(createUserDto);
//     if (result.isFailure()) {
//       throw result.exception();
//     }
//     return UserGraph.of(result.getOrThrow());
//   }
// }
