import { BaseDataError } from './baseDataError';
import { ErrorCode } from '~/@shared/enums/errorCode';

export class DataNotFoundError extends BaseDataError {
  get message(): string {
    return this.dataType + '_not_found';
  }

  getCode(): string {
    return ErrorCode.DATA_NOT_FOUND;
  }
}
