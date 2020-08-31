export interface InputOptions {
  /**
   * A label to be displayed for the Input component
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  label: string;
  /**
   * Input mask
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  mask?: string;
  /**
   * A text visible in the typing area of this component
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  placeholder?: string;
  /**
   * A text suggestion to clarify what is expected from the user
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  hint?: string;
  /**
   * Input's visual appearance style override.
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  appearance?: string;
  /**
   * Type
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  type?: string;
  /**
   * Checked flag
   * @description
   * @type {boolean}
   * @memberof InputOptions
   */
  checked?: boolean;
  /**
   * A flag to determine if this control should be mandatory before submitting
   * @description
   * @type {boolean}
   * @memberof InputOptions
   */
  required?: boolean;
  /**
   * Icon name
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  icon?: string;
  /**
   * Max length of characters to type
   * @description
   * @type {number}
   * @memberof InputOptions
   */
  maxLength?: number;
  /**
   * Min length of characters to type
   * @description
   * @type {number}
   * @memberof InputOptions
   */
  minLength?: number;
  /**
   * Input pattern
   * @description
   * @type {string}
   * @memberof InputOptions
   */
  pattern?: RegExp;
  /**
   * Input field
   */
  prefix?: string;
  /**
   * Enable autocomplete
   */
  enableAutocomplete?: boolean;
}
