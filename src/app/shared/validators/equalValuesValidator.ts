import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValuesValidator(
  field1: string,
  field2: string,
): ValidatorFn {
  return function (formGroup: AbstractControl) {
    const value1: string = formGroup.get(field1)?.value;
    const value2: string = formGroup.get(field2)?.value;

    if (value1 !== value2) {
      return { equalValues: `value ${value1} is not equal to ${value2}` };
    }

    return null;
  };
}
