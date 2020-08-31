import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BadRequestError, ErrorMessage } from '../interfaces';
import { FormService } from './form.service';

/**
 * Error service
 * @export
 * @class ErrorService
 */
@Injectable()
export class ErrorService {
  /**
   * Creates an instance of ErrorService.
   * @param {FormService} _formService
   * @memberof ErrorService
   */
  public constructor(private _formService: FormService) {}

  /**
   * Returns either a general error message or specific form validation errors
   * @param {BadRequest} badRequest
   * @param {FormGroup} form
   * @returns {(string | FormGroup)}
   * @memberof ErrorService
   */
  public handleError(
    badRequest: BadRequestError,
    form: FormGroup
  ): string | FormGroup {
    if (typeof badRequest?.message === 'string') {
      return badRequest.message as string;
    }

    if (!!badRequest?.message && Object.keys(badRequest.message).length > 0) {
      return this._formService.getPatchedFormGroupWithServerErrors(
        form,
        badRequest.message as ErrorMessage
      );
    }
  }
}
