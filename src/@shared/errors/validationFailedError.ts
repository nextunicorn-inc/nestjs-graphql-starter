import { BaseError } from '~/@shared/errors/baseError';
import { ValidationError } from '@nestjs/common';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class ValidationFailedError extends BaseError {
  constructor(private readonly errors: ValidationError[]) {
    super();
  }

  getCode(): string {
    return ErrorCode.VALIDATION_FAILED;
  }

  getDetails(): Record<string, any> | undefined {
    return {
      errors: this.errors.map((error) => error.value),
    };
  }
}
