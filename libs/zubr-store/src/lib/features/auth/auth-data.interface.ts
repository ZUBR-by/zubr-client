export interface AuthData {
  /**
   * Auth access token
   * @description
   * @type {string}
   * @memberof AuthData
   */
  access_token: string;
  /**
   * Auth expiration time
   * @description
   * @type {number}
   * @memberof AuthData
   */
  expires_in: number;
  /**
   * Auth refresh expiration time
   * @description
   * @type {number}
   * @memberof AuthData
   */
  refresh_expires_in: number;
  /**
   * Auth refresh token
   * @description
   * @type {string}
   * @memberof AuthData
   */
  refresh_token: string;
  /**
   * Auth token type
   * @description
   * @type {string}
   * @memberof AuthData
   */
  token_type: string;
  /**
   * Auth suspense time
   * @description
   * @type {number}
   * @memberof AuthData
   */
  'not-before-policy': number;
  /**
   * Auth session state
   * @description
   * @type {number}
   * @memberof AuthData
   */
  session_state: number;
  /**
   * Auth scope
   * @description
   * @type {string}
   * @memberof AuthData
   */
  scope: string;
}
