import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessage } from '../interfaces/error-message.interface';

/**
 * Form service
 * @description
 * @export
 * @class FormService
 */
@Injectable()
export class FormService {
  /**
   * Maps errors to form group
   * @description This method patches and redefines form group by
   * setting server errors to every invalid field
   * @param {FormGroup} formGroup
   * @param {any[]} validationErrors
   * @returns {FormGroup}
   * @memberof FormService
   */
  public getPatchedFormGroupWithServerErrors(
    formGroup: FormGroup,
    validationErrors: ErrorMessage
  ): FormGroup {
    const formControlNames: string[] = Object.keys(validationErrors);

    formControlNames.forEach(formControlName => {
      if (formGroup.get(formControlName)) {
        const errors: any = [];
        const errorMessage: string = validationErrors[formControlName];
        errors[errorMessage] = 'true';

        formGroup.get(formControlName).setErrors(errors);
        formGroup.get(formControlName).markAsTouched();
      }});

    return formGroup;
  }

  /**
   * Maps entity values to form group
   * @description
   * @param {FormGroup} formGroup
   * @param {object} entity
   * @returns {FormGroup}
   * @memberof FormService
   */
  public getPatchedFormGroupWithData(
    formGroup: FormGroup,
    entity: object
  ): FormGroup {
    const fields: string[] = Object.keys(formGroup.controls);

    for (const field of fields) {
      if (!!entity[field]) {
        formGroup.controls[field].setValue(entity[field]);
        formGroup.controls[field].markAsTouched();
      }
    }

    return formGroup;
  }

  /**
   * Maps entity from form group
   * @description
   * @template T
   * @param {FormGroup} formGroup
   * @param {T} entity
   * @returns {T}
   * @memberof FormService
   */
  public getPatchedEntityFromFormGroup<T>(formGroup: FormGroup, entity: T): T {
    const fields: string[] = Object.keys(formGroup.controls);

    for (const field of fields) {
      if (entity[field] !== undefined) {
        entity[field] = formGroup.controls[field].value;
      }
    }

    return entity;
  }

  /**
   * Marks form group as touched and displays error messages
   * @description
   * @param {FormGroup} formGroup
   * @memberof FormService
   */
  public markFormGroupAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      }
    });
  }
}
