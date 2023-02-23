import { Catch } from '@nestjs/common';
import { BaseError } from '~/@shared/errors/baseError';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BaseError)
export class MainExceptionFilter implements GqlExceptionFilter {
  catch(exception: BaseError) {
    return exception.toGraphQLError();
  }
}
