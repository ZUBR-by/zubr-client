import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ObserverDataActions } from './observer.actions';
import { Observer } from './observer.interface';
import { ObserverService } from './observer.service';

/**
 * Observer effects
 * @description
 * @export
 * @class ObserverEffects
 */
@Injectable()
export class ObserverEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Observerenprofile aktualisiert', 'Dismiss');

      return this._observerService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._observerService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Observer = action.payload.data;

      this._snackBar.open('Ein neuer Observer wird angelegt', 'Dismiss');

      this._router.navigate(
        [
          `//observer/${entity.id}`,
        ]
      );

      return this._observerService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._observerService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Observerenprofile gelöscht', 'Dismiss');

      this._router.navigate(
        [
          '/elections/observers',
        ]
      );

      return this._observerService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof ObserverEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(ObserverDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._observerService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    private _observerService: ObserverService,
    private _router: Router
  ) {}

}
