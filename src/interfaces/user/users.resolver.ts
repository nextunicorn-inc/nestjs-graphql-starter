import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DataLoad } from '~/interfaces/@decorator/dataLoader.decorator';
import { UserDataloaderDelegate } from '~/interfaces/@dataloader/user.dataloader.delegate';
import { UserDto } from '~/domain/user/dto/user.dto';
import DataLoader from 'dataloader';
import { UserId } from '~/interfaces/@decorator/userId.decorator';
import { UserGraph } from '~/interfaces/@graph/user.graph';
import { UserOnly } from '~/interfaces/@decorator/userOnly';
import { UserFollowFacade } from '~/application/user/userFollow.facade';

@Resolver(() => UserGraph)
export class UsersResolver {
  constructor(private readonly userFollowFacade: UserFollowFacade) {}

  @Query(() => UserGraph, { name: 'me' })
  @UserOnly()
  async me(
    @DataLoad(UserDataloaderDelegate)
    userDataLoader: DataLoader<number, UserDto>,
    @UserId()
    myId: number,
  ) {
    return userDataLoader.load(myId);
  }

  @Query(() => UserGraph, { name: 'user' })
  async user(
    @DataLoad(UserDataloaderDelegate)
    userDataLoader: DataLoader<number, UserDto>,
    @Args('id', { type: () => Int }) userId: number,
  ) {
    return userDataLoader.load(userId);
  }

  @ResolveField()
  async followers(
    @DataLoad(UserDataloaderDelegate)
    userDataLoader: DataLoader<number, UserDto>,
    @Parent() user: UserGraph,
  ) {
    const { id } = user;
    return this.userFollowFacade
      .findFollowerIdsByUserId(id)
      .then((ret) => ret.getOrThrow())
      .then((ids) => {
        return userDataLoader
          .loadMany(ids)
          .then((v) => v.filter((v) => v instanceof UserDto));
      });
  }

  @ResolveField()
  async followings(
    @DataLoad(UserDataloaderDelegate)
    userDataLoader: DataLoader<number, UserDto>,
    @Parent() user: UserGraph,
  ) {
    const { id } = user;
    return this.userFollowFacade
      .findFollowingIdsByUserId(id)
      .then((ret) => ret.getOrThrow())
      .then((ids) => {
        return userDataLoader
          .loadMany(ids)
          .then((v) => v.filter((v) => v instanceof UserDto));
      });
  }
}
