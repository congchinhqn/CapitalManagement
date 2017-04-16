import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { isPresent } from './base.validator';

export const lessThan = (lt: number): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: boolean} => {
    if (!isPresent(lt)) return null;
    if (isPresent(Validators.required(control))) return null;

    let v: number = +control.value;
    return v < +lt ? null : {lt: true};
  };
};