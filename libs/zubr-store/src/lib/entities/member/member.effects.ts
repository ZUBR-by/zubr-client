import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntityAction } from '@ngrx/data';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { MemberDataActions } from './member.actions';
import { Member } from './member.interface';
import { MemberService } from './member.service';

/**
 * Member effects
 * @description
 * @export
 * @class MemberEffects
 */
@Injectable()
export class MemberEffects {

  /**
   * Update success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveUpdateOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveUpdateOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Memberenprofile aktualisiert', 'Dismiss');

      return this._memberService.handleSuccess(action);

    })

  ));

  /**
   * Update failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveUpdateOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveUpdateOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._memberService.handleError(action);

    })

  ));

  /**
   * Creation success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveAddOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveAddOneSuccess.type),

    concatMap((action: EntityAction) => {

      const entity: Member = action.payload.data;

      this._snackBar.open('Ein neuer Member wird angelegt', 'Dismiss');

      this._router.navigate(
        [
          `//member/${entity.id}`,
        ]
      );

      return this._memberService.handleSuccess(action);

    })

  ));

  /**
   * Creation failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveAddOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveAddOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._memberService.handleError(action);

    })

  ));

  /**
   * Deletion success effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveDeleteOneSuccess$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveDeleteOneSuccess.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Memberenprofile gelöscht', 'Dismiss');

      this._router.navigate(
        [
          '/elections/members',
        ]
      );

      return this._memberService.handleSuccess(action);
    })

  ));

  /**
   * Deletion failure effect
   * @description
   * @type {Observable<Action>}
   * @memberof MemberEffects
   */
  public SaveDeleteOneError$: Observable<Action> = createEffect(() => this._actions$.pipe(

    ofType(MemberDataActions.SaveDeleteOneError.type),

    concatMap((action: EntityAction) => {

      this._snackBar.open('Aktion fehlgeschlagen', 'Dismiss');

      return this._memberService.handleError(action);

    })

  ));

  public constructor(
    private _actions$: Actions,
    private _snackBar: MatSnackBar,
    private _memberService: MemberService,
    private _router: Router
  ) {}

}
