// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { PostFacade } from '~/application/post/post.facade';
// import { PostGraph } from '~/interfaces/@graph/post.graph';
// import { UserOnly } from '~/interfaces/@decorator/userOnly';
// import { WritePostRequest } from '~/interfaces/@request/writePost.request';
// import { User } from '~/interfaces/@decorator/user.decorator';
// import { UserDto } from '~/domain/user/dto/user.dto';
// import { UserId } from '~/interfaces/@decorator/userId.decorator';
// import { ParamInt } from '~/interfaces/@decorator/paramInt.decorator';
// import { OkResponse } from '~/interfaces/@graph/ok.response';
//
// @Controller('posts')
// @ApiTags('posts')
// export class PostsController {
//   constructor(private readonly postFacade: PostFacade) {}
//
//   @Get('/:id')
//   @HttpCode(HttpStatus.OK)
//   async readOne(@ParamInt('id') id: number): Promise<PostGraph> {
//     const post = await this.postFacade
//       .findPostById(id)
//       .then((v) => v.getOrThrow());
//     return PostGraph.of(post);
//   }
//
//   @Post()
//   @UserOnly()
//   @HttpCode(HttpStatus.CREATED)
//   async writePost(
//     @User() user: UserDto,
//     @Body() writePostRequest: WritePostRequest,
//   ): Promise<PostGraph> {
//     const post = await this.postFacade
//       .writePost(user.id, writePostRequest)
//       .then((v) => v.getOrThrow());
//     return PostGraph.of({
//       post,
//       user,
//     });
//   }
//
//   @Delete('/:id')
//   @UserOnly()
//   @HttpCode(HttpStatus.OK)
//   async deletePost(
//     @UserId() userId: number,
//     @ParamInt('id') postId: number,
//   ): Promise<OkResponse> {
//     await this.postFacade
//       .deletePost(postId, userId)
//       .then((v) => v.getOrThrow());
//     return OkResponse.of();
//   }
// }
