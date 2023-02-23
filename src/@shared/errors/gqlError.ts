import { ErrorCode } from '~/@shared/enums/errorCode';
import { GraphQLError } from 'graphql/error';
import { BaseError } from '~/@shared/errors/baseError';

export class GqlError extends BaseError {
  constructor(private readonly error: GraphQLError) {
    super();
  }

  get message(): string {
    return this.error.message;
  }

  getCode(): string {
    return ErrorCode.GQL_FAILED;
  }

  getOriginalError(): Error {
    return this.error.originalError || this.error;
  }

  getDetails(): Record<string, any> | undefined {
    return {
      path: this.error.path,
    };
  }
}
