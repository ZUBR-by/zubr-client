import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CommissionDataActions } from './commission.actions';
import { Commission } from './commission.interface';
import { CommissionService } from './commission.service';

/**
 * Commission effects
 * @description
 * @export
 * @class CommissionEffects
 */
@Injectable()
export class CommissionEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Commissionenprofile aktualisiert', 'Dismiss');

      return this._commissionService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._commissionService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Commission = action.payload.data;

      this._snackBar.open('Ein neuer Commission wird angelegt', 'Dismiss');

      this._router.navigate(
        [
          `/elections/commission/${entity.id}`,
        ]
      );

      return this._commissionService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._commissionService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Commissionenprofile gelöscht', 'Dismiss');

      this._router.navigate(
        [
          '/elections/commissions',
        ]
      );

      return this._commissionService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof CommissionEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(CommissionDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._commissionService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    private _commissionService: CommissionService,
    private _router: Router
  ) {}

}
