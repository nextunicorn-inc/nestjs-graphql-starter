import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from '~/interfaces/@request/createUser.request';
import { UserResponse } from '~/interfaces/@response/user.response';
import { UserFacade } from '~/application/user/user.facade';
import { UserOnly } from '~/interfaces/@decorator/userOnly';
import { User } from '~/interfaces/@decorator/user';
import { UserDto } from '~/domain/user/dto/user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get('me')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  async me(@User() user: UserDto): Promise<UserResponse> {
    return UserResponse.of(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserRequest,
  ): Promise<UserResponse> {
    const result = await this.userFacade.createUser(createUserDto);
    if (result.isFailure()) {
      throw result.exception();
    }
    return UserResponse.of(result.getOrThrow());
  }
}
