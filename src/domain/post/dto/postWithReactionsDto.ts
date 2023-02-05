import { PostDto } from '~/domain/post/dto/post.dto';
import { PostReactionDto } from '~/domain/post/dto/postReaction.dto';

export class PostWithReactionsDto {
  post: PostDto;
  reactions: PostReactionDto[];
}
