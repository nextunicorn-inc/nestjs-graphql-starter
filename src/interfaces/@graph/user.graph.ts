import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostGraph } from '~/interfaces/@graph/post.graph';

@ObjectType()
export class UserGraph {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => [UserGraph])
  followers: UserGraph[];

  @Field(() => [UserGraph])
  followings: UserGraph[];

  @Field(() => [PostGraph])
  posts: PostGraph[];
}
