import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { OrganizationDataActions } from './organization.actions';
import { Organization } from './organization.interface';
import { OrganizationService } from './organization.service';

/**
 * Organization effects
 * @description
 * @export
 * @class OrganizationEffects
 */
@Injectable()
export class OrganizationEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Organizationenprofile aktualisiert', 'Dismiss');

      return this._organizationService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._organizationService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Organization = action.payload.data;

      this._snackBar.open('Ein neuer Organization wird angelegt', 'Dismiss');

      this._router.navigate(
        [
          `//organization/${entity.id}`,
        ]
      );

      return this._organizationService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._organizationService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Organizationenprofile gelöscht', 'Dismiss');

      this._router.navigate(
        [
          '/elections/organizations',
        ]
      );

      return this._organizationService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof OrganizationEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(OrganizationDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._organizationService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    private _organizationService: OrganizationService,
    private _router: Router
  ) {}

}
