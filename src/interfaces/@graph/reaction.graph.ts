import { UserGraph } from '~/interfaces/@graph/user.graph';
import { ReactionType } from '~/domain/post/dto/reactionType';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReactionGraph {
  @Field(() => Int)
  id: number;
  @Field(() => UserGraph)
  user: UserGraph;
  @Field(() => ReactionType)
  reaction: ReactionType;
  @Field()
  createdAt: Date;
}
