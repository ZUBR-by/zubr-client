import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { VerifyDataActions } from './verify.actions';
import { Verify } from './verify.interface';
import { VerifyService } from './verify.service';

/**
 * Verify effects
 * @description
 * @export
 * @class VerifyEffects
 */
@Injectable()
export class VerifyEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_updated');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Verify = action.payload.data;

      this._snackbarService.open('verification_succeed');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_deleted');

      this._router.navigate(
        [
          '/elections/observerRequests',
        ]
      );

      return this._observerRequestService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof VerifyEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(VerifyDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackbarService: SnackBarService,
    private _observerRequestService: VerifyService,
    private _router: Router
  ) {}

}
