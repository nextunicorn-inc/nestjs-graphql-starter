import { BaseError } from '~/@shared/errors/baseError';

export abstract class BaseDataError extends BaseError {
  constructor(public readonly dataType: string, message?: string) {
    super(message);
  }

  get message(): string {
    return this.getCode() + +' / ' + this.dataType + ' / ' + super.message;
  }
}
