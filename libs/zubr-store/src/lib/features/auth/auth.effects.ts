import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { AuthDataService } from './auth-data.service';
import { authActions } from './auth.actions';

/**
 * Auth effects
 * @description
 * @export
 * @class AuthEffects
 */
@Injectable()
export class AuthEffects {

  /**
   * Auth login effect
   * @description
   * @type {Observable<Action>}
   * @memberof AuthEffects
   */
  public Login$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(authActions.Login.type),
    concatMap(action => {
        return this._authDataService.getToken(action['payload']).pipe(
          map(
            (authData: AuthData) => {
              this._router.navigate(['/']);

              return authActions.LoginSuccess({
                payload: authData,
              });
            }
          ),
          catchError((error: HttpErrorResponse) => of(
            authActions.LoginFailure({
              payload: error,
            }))
          )
        );
      }
    )

  ));

  /**
   * Auth logout effect
   * @description
   * @type {Observable<Action>}
   * @memberof AuthEffects
   */
  public Logout$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(authActions.Logout.type),
    concatMap(() => {
      this._router.navigate(['/login'], {
        queryParams: { expired: 1 },
      });

      return of(authActions.LoginSuccess(null));
    })

  ));

  public constructor(
    private _actions$: Actions,
    private _authDataService: AuthDataService,
    private _router: Router
  ) {}

}
