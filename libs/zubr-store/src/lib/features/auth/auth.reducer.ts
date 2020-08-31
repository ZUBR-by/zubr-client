import { createReducer, createSelector, on, ActionReducer, MemoizedSelector } from '@ngrx/store';
import { authFeatureKey, AppState } from '../../zubr-store.constants';
import { AuthData } from './auth-data.interface';
import { AuthState } from './auth-state.interface';
import { authActions } from './auth.actions';

export const initialAuthState: AuthState =
  localStorage.getItem(authFeatureKey) ?
    JSON.parse(localStorage.getItem(authFeatureKey)) :
  {
    isAuthorized: false,
    authData: null,
  };

export const authReducer: ActionReducer<AuthState> = createReducer(

  initialAuthState,

  on(authActions.LoginSuccess, (state, action) => {
    return {
      ...state,
      isAuthorized: true,
      authData: action.payload,
    };
  }),

  on(authActions.Logout, (state, action) => {
    return {
      ...state,
      isAuthorized: false,
      authData: null,
    };
  })

);

export const selectAuthData: MemoizedSelector<AppState, AuthData> = createSelector(
  (state: AppState) => state[authFeatureKey],
  (state: AuthState) => state.authData
);
