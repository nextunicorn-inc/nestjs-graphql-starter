import { UserGraph } from '~/interfaces/@graph/user.graph';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostGraph {
  @Field(() => Int)
  id: number;
  @Field(() => UserGraph)
  user: UserGraph;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
