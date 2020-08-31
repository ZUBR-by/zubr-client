import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ObserverRequestDataActions } from './observer-request.actions';
import { ObserverRequest } from './observer-request.interface';
import { ObserverRequestService } from './observer-request.service';

/**
 * ObserverRequest effects
 * @description
 * @export
 * @class ObserverRequestEffects
 */
@Injectable()
export class ObserverRequestEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverRequestEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_updated');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverRequestEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverRequestEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: ObserverRequest = action.payload.data;

      this._snackbarService.open('observer_request_sent');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverRequestEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverRequestEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveDeleteOneSuccess.type),

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
   * @memberof ObserverRequestEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverRequestDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackbarService: SnackBarService,
    private _observerRequestService: ObserverRequestService,
    private _router: Router
  ) {}

}
