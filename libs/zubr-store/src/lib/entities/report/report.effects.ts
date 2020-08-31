import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ReportDataActions } from './report.actions';
import { Report } from './report.interface';
import { ReportService } from './report.service';

/**
 * Report effects
 * @description
 * @export
 * @class ReportEffects
 */
@Injectable()
export class ReportEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ReportEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('observer_request_updated');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ReportEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ReportEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Report = action.payload.data;

      this._snackbarService.open('turnout_registered');

      return this._observerRequestService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ReportEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ReportEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveDeleteOneSuccess.type),

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
   * @memberof ReportEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ReportDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackbarService.open('error_occurred');

      return this._observerRequestService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackbarService: SnackBarService,
    private _observerRequestService: ReportService,
    private _router: Router
  ) {}

}
