// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { UserFacade } from '~/application/user/user.facade';
// import { CreateSessionsRequest } from '~/interfaces/@request/createSessionsRequest';
// import { TokenGraph } from '~/interfaces/@graph/token.graph';
//
// @Controller('auth')
// @ApiTags('auth')
// export class AuthController {
//   constructor(private readonly userFacade: UserFacade) {}
//
//   @Post('sessions')
//   @HttpCode(HttpStatus.CREATED)
//   async createSessions(
//     @Body() createSessionsRequest: CreateSessionsRequest,
//   ): Promise<TokenGraph> {
//     const loginResult = await this.userFacade.login(createSessionsRequest);
//     if (loginResult.isFailure()) {
//       throw loginResult.exception();
//     }
//     return TokenGraph.of(loginResult.getOrThrow());
//   }
// }
