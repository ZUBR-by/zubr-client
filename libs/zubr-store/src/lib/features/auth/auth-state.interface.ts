import { AuthData } from './auth-data.interface';

export interface AuthState {
  /**
   * Auth authorization flag
   * @description
   * @type {boolean}
   * @memberof AuthState
   */
  isAuthorized: boolean;
  /**
   * Auth data
   * @description
   * @type {AuthData}
   * @memberof AuthState
   */
  authData: AuthData;
}
