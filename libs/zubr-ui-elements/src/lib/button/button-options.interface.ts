export interface ButtonOptions {
  /**
   * A label to be displayed for the Button component
   * @description
   * @type {string}
   * @memberof ButtonOptions
   */
  label?: string;
  /**
   * Color
   * @description
   * @type {string}
   * @memberof ButtonOptions
   */
  color?: string;
  /**
   * Button's visual appearance style override.
   * @description
   * @type {string}
   * @memberof ButtonOptions
   */
  appearance?: string;
  /**
   * Disabled
   * @description
   * @type {boolean}
   * @memberof ButtonOptions
   */
  disabled?: boolean;
  /**
   * Router link
   * @description
   * @type {string}
   * @memberof ButtonOptions
   */
  routerLink?: string;
  /**
   * icon
   * @description
   * @type {string}
   * @memberof ButtonOptions
   */
  icon?: string;
  /**
   * Makes this button focused
   * @type {boolean}
   * @memberof ButtonOptions
   */
  focus?: boolean;
}
