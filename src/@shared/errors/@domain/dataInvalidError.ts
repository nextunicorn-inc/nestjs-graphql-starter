import { BaseDataError } from './baseDataError';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class DataInvalidError extends BaseDataError {
  getCode(): string {
    return ErrorCode.DATA_INVALID;
  }
}
