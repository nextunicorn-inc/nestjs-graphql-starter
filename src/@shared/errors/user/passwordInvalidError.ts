import { BaseError } from '~/@shared/errors/baseError';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class PasswordInvalidError extends BaseError {
  getCode(): string {
    return ErrorCode.PASSWORD_INVALID;
  }
}
