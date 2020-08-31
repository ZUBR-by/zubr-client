import { ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';

export interface AuthActions {
  /**
   * Log In action
   */
  Login: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Log In Success action
   */
  LoginSuccess: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Log In Failure action
   */
  LoginFailure: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Log Out action
   */
  Logout: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Log Out Success action
   */
  LogoutSuccess: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Log Out Failure action
   */
  LogoutFailure: ActionCreator<string, FunctionWithParametersType<any[], any>>;
}
