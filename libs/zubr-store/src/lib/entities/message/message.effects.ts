import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { MessageDataActions } from './message.actions';
import { Message } from './message.interface';
import { MessageService } from './message.service';

/**
 * Message effects
 * @description
 * @export
 * @class MessageEffects
 */
@Injectable()
export class MessageEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MessageEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_updated');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof MessageEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MessageEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Message = action.payload.data;

      this._snackbarService.open('incident_registered');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof MessageEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MessageEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveDeleteOneSuccess.type),

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
   * @memberof MessageEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MessageDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackbarService: SnackBarService,
    private _observerRequestService: MessageService,
    private _router: Router
  ) {}

}
