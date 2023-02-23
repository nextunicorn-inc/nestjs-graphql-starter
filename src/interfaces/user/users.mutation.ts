import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserGraph } from '~/interfaces/@graph/user.graph';
import { CreateUserInput } from '~/interfaces/@request/createUserInput';
import { UserFacade } from '~/application/user/user.facade';

@Resolver()
export class UsersMutation {
  constructor(private readonly userFacade: UserFacade) {}

  @Mutation(() => UserGraph, { name: 'createUser' })
  async createUser(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    const result = await this.userFacade.register(createUserInput);
    if (result.isFailure()) {
      throw result.exception();
    }
    return result.getOrThrow();
  }
}
