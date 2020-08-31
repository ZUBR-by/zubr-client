export interface TextareaOptions {
  /**
   * A label to be displayed for the Textarea component
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  label: string;
  /**
   * Textarea mask
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  mask?: string;
  /**
   * A text visible in the typing area of this component
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  placeholder?: string;
  /**
   * A text suggestion to clarify what is expected from the user
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  hint?: string;
  /**
   * Textarea's visual appearance style override.
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  appearance?: string;
  /**
   * Type
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  type?: string;
  /**
   * Checked flag
   * @description
   * @type {boolean}
   * @memberof TextareaOptions
   */
  checked?: boolean;
  /**
   * A flag to determine if this control should be mandatory before submitting
   * @description
   * @type {boolean}
   * @memberof TextareaOptions
   */
  required?: boolean;
  /**
   * Icon name
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  icon?: string;
  /**
   * Max length of characters to type
   * @description
   * @type {number}
   * @memberof TextareaOptions
   */
  maxLength?: number;
  /**
   * Min length of characters to type
   * @description
   * @type {number}
   * @memberof TextareaOptions
   */
  minLength?: number;
  /**
   * Textarea pattern
   * @description
   * @type {string}
   * @memberof TextareaOptions
   */
  pattern?: RegExp;
  /**
   * Textarea field
   */
  prefix?: string;
}
