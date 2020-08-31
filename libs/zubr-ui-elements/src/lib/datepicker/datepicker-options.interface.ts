export interface DatepickerOptions {
  /**
   * A label to be displayed for the Datepicker component
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  label: string;
  /**
   * Datepicker mask
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  mask?: string;
  /**
   * A text visible in the typing area of this component
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  placeholder?: string;
  /**
   * A text suggestion to clarify what is expected from the user
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  hint?: string;
  /**
   * Datepicker's visual appearance style override.
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  appearance?: string;
  /**
   * Type
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  type?: string;
  /**
   * Checked flag
   * @description
   * @type {boolean}
   * @memberof DatepickerOptions
   */
  checked?: boolean;
  /**
   * A flag to determine if this control should be mandatory before submitting
   * @description
   * @type {boolean}
   * @memberof DatepickerOptions
   */
  required?: boolean;
  /**
   * Icon name
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  icon?: string;
  /**
   * Max length of characters to type
   * @description
   * @type {number}
   * @memberof DatepickerOptions
   */
  maxLength?: number;
  /**
   * Min length of characters to type
   * @description
   * @type {number}
   * @memberof DatepickerOptions
   */
  minLength?: number;
  /**
   * Datepicker pattern
   * @description
   * @type {string}
   * @memberof DatepickerOptions
   */
  pattern?: RegExp;
  /**
   * Datepicker field
   */
  prefix?: string;
}
