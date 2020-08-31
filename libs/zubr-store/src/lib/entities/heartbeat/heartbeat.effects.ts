import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { HeartbeatDataActions } from './heartbeat.actions';
import { Heartbeat } from './heartbeat.interface';
import { HeartbeatService } from './heartbeat.service';

/**
 * Heartbeat effects
 * @description
 * @export
 * @class HeartbeatEffects
 */
@Injectable()
export class HeartbeatEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof HeartbeatEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_updated');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof HeartbeatEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof HeartbeatEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Heartbeat = action.payload.data;

      this._snackbarService.open('verification_succeed');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof HeartbeatEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof HeartbeatEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveDeleteOneSuccess.type),

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
   * @memberof HeartbeatEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(HeartbeatDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackbarService: SnackBarService,
    private _observerRequestService: HeartbeatService,
    private _router: Router
  ) {}

}
