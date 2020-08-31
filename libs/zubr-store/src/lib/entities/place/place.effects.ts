import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { PlaceDataActions } from './place.actions';
import { Place } from './place.interface';
import { PlaceService } from './place.service';

/**
 * Place effects
 * @description
 * @export
 * @class PlaceEffects
 */
@Injectable()
export class PlaceEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Placeenprofile aktualisiert', 'Dismiss');

      return this._placeService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._placeService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Place = action.payload.data;

      this._snackBar.open('Ein neuer Place wird angelegt', 'Dismiss');

      this._router.navigate(
        [
          `//place/${entity.place_id}`,
        ]
      );

      return this._placeService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._placeService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Placeenprofile gelöscht', 'Dismiss');

      this._router.navigate(
        [
          '/elections/places',
        ]
      );

      return this._placeService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof PlaceEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(PlaceDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._placeService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    private _placeService: PlaceService,
    private _router: Router
  ) {}

}
