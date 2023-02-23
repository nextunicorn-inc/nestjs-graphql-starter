import { GraphQLError } from 'graphql/error';

export abstract class BaseError extends Error {
  constructor(message?: string) {
    super(message);
  }

  abstract getCode(): string;
  getDetails(): Record<string, any> | undefined {
    return undefined;
  }

  getOriginalError(): Error {
    return this;
  }

  toGraphQLError(): GraphQLError {
    return new GraphQLError(this.message, {
      extensions: {
        ...this.getDetails(),
        stack: (process.env.NODE_ENV !== 'production'
          ? this.getOriginalError().stack?.split('\n')
          : undefined) as any,
        code: this.getCode(),
      },
      originalError: this,
    });
  }
}
