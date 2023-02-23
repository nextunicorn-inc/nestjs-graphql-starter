// import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { ParamInt } from '~/interfaces/@decorator/paramInt.decorator';
// import { ReactionGraph } from '~/interfaces/@graph/reaction.graph';
// import { PostReactionFacade } from '~/application/post/postReaction.facade';
//
// @Controller('posts')
// @ApiTags('posts')
// export class PostsReactionController {
//   constructor(private readonly postReactionFacade: PostReactionFacade) {}
//
//   @Get('/:id/reactions')
//   @HttpCode(HttpStatus.OK)
//   async reactions(@ParamInt('id') id: number): Promise<ReactionGraph[]> {
//     const reactionWithUserDtos = await this.postReactionFacade
//       .findReactionsByPostId(id)
//       .then((v) => v.getOrThrow());
//     return reactionWithUserDtos.map((v) => ReactionGraph.of(v));
//   }
// }
