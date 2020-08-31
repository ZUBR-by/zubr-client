import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { authFeatureKey } from '../../zubr-store.constants';
import { AuthActions } from './auth-actions.interface';
import { AuthCredentials } from './auth-credentials.interface';
import { AuthData } from './auth-data.interface';

/**
 * Common page actions
 */
export const authActions: AuthActions  = {

  Login: createAction(
    `[${authFeatureKey}] log in`, props<{
      /**
       * Action payload
       */
      payload: AuthCredentials;
    }>()
  ),

  LoginSuccess: createAction(
    `[${authFeatureKey}] log in success`, props<{
      /**
       * Action payload
       */
      payload: AuthData;
    }>()
  ),

  LoginFailure: createAction(
    `[${authFeatureKey}] log in failure`, props<{
      /**
       * Action payload
       */
      payload: HttpErrorResponse;
    }>()
  ),

  Logout: createAction(`[${authFeatureKey}] log out`),

  LogoutSuccess: createAction(`[${authFeatureKey}] log out success`),

  LogoutFailure: createAction(`[${authFeatureKey}] log out failure`),

};
