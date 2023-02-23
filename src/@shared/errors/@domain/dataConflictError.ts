import { BaseDataError } from './baseDataError';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class DataConflictError extends BaseDataError {
  getCode(): string {
    return ErrorCode.DATA_CONFLICT;
  }
}
