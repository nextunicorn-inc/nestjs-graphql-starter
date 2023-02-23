import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenGraph {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Int)
  expiresIn: number;
}
