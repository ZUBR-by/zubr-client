import { ValueLabel } from '@zubr-client/zubr-interfaces';

export interface SelectOptions {
  /**
   * A label to be displayed for the Select component
   * @description
   * @type {string}
   * @memberof SelectOptions
   */
  label: string;
  /**
   * A text visible in the typing area of this component
   * @description
   * @type {string}
   * @memberof SelectOptions
   */
  placeholder?: string;
  /**
   * A text suggestion to clarify what is expected from the user
   * @description
   * @type {string}
   * @memberof SelectOptions
   */
  hint?: string;
  /**
   * Select's visual appearance style override.
   * @description
   * @type {string}
   * @memberof SelectOptions
   */
  appearance?: string;
  /**
   * Component's source of data
   * @description
   * @type {ValueLabel[]}
   * @memberof SelectOptions
   */
  dataSource: ValueLabel[];
  /**
   * A flag to determine if this control should be mandatory before submitting
   * @description
   * @type {boolean}
   * @memberof SelectOptions
   */
  required?: boolean;
  /**
   * Is multiple
   * @description
   * @type {boolean}
   * @memberof SelectOptions
   */
  multiple?: boolean;
}
