import { BaseError } from '~/@shared/errors/baseError';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class NoPermissionError extends BaseError {
  getCode(): string {
    return ErrorCode.NO_PERMISSION;
  }
}
