import { ValidationError } from '@nestjs/common';
import { ValidationFailedError } from '~/@shared/errors/validationFailedError';

/**
 * Validation과정의 error를 BaseError를 상속받은 에러로 변환
 * @param errors: 원래 validation errors
 * @see https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
 */
export const validatorErrorFactory: (errors: ValidationError[]) => any = (
  errors: ValidationError[],
) => {
  return new ValidationFailedError(errors);
};
