import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Pattern } from '../constants';
/**
 * class CustomValidators
 * Provides custom validators for Angular form controls
 */
export class CustomValidators {
  /**
   *
   * Input exact length validator with message
   */
  public static exactLengthDigits(_translateService: TranslateService, exactLengthDigits: number): ValidatorFn | null {
    const onlyPositiveNumbers: RegExp = Pattern.PositiveDigitsOnly;

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value?.length !== exactLengthDigits || !onlyPositiveNumbers.test(control.value)) {

        const errorMessage: string = exactLengthDigits === 1
          ? _translateService.instant('field_length_exact_one')
          : _translateService.instant('field_length_exact', {length: exactLengthDigits});

        return { [errorMessage]: true };
      }

      return null;
    };
  }

  /**
   *
   * Input min length validator with message
   */
  public static minLength(_translateService: TranslateService, minLength: number): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.length < minLength) {

        const errorMessage: string = _translateService.instant('field_length_min', {length: minLength});

        return { [errorMessage]: true };
      }

      return null;
    };
  }

  /**
   *
   * Input max length validator with message
   */
  public static maxLength(_translateService: TranslateService, maxLength: number): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value?.length > maxLength) {

        const errorMessage: string = _translateService.instant('field_length_max', {length: maxLength});

        return { [errorMessage]: true };
      }

      return null;
    };
  }

  /**
   *
   * Input digits only validator with message
   */
  public static digitsOnly(control: AbstractControl): { [key: string]: boolean} | null {
      if (control.value?.length > 0) {
        const regExp: RegExp = Pattern.DigitsOnly;

        return regExp.test(control.value)
          ? null
          : { digits_only: true };
      }

      return null;
  }

  /**
   *
   * Input digits only validator with message
   */
  public static cyrillicOnly(control: AbstractControl): { [key: string]: boolean} | null {
    if (control.value?.length > 0) {
      const regExp: RegExp = Pattern.CyrillicOnly;

      return regExp.test(control.value.trim())
        ? null
        : { cyrillic_only: true };
    }

    return null;
  }

  /**
   *
   * Phone number allowed characters validator
   */
  public static phoneNumber(control: AbstractControl): { [key: string]: boolean} | null {
    if (control.value.length > 0) {

      const regExp: RegExp = Pattern.PhoneNumber;

      if (regExp.test(control.value)) {

        return null;

      } else {

        return { phone_number_validation: true };
      }
    }

    return null;
  }
}
