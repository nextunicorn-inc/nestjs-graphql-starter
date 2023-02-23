import { registerEnumType } from '@nestjs/graphql';

export enum ReactionType {
  LIKE = 'LK',
  HEART = 'HR',
  SAD = 'SD',
}

registerEnumType(ReactionType, {
  name: 'ReactionType',
});
