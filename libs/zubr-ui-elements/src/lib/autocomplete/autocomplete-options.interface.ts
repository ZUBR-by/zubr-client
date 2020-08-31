import {
  DataGridEntityOptions,
  EntityDataSource
} from '@zubr-client/zubr-ui-elements';

export interface AutocompleteOptions<T> {
  /**
   * A label to be displayed for the Autocomplete component
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  label: string;
  /**
   * A text visible in the typing area of this component
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  placeholder?: string;
  /**
   * A text suggestion to clarify what is expected from the user
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  hint?: string;
  /**
   * Autocomplete's visual appearance style override.
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  appearance?: string;
  /**
   * Type
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  type?: string;
  /**
   * Suggested key
   * @description
   * @type {string}
   * @memberof AutocompleteOptions
   */
  suggestedKey: string;
  /**
   * A flag that determins whether it is possible to adjust component for the user
   * @description
   * @type {boolean}
   * @memberof AutocompleteOptions
   */
  readonly?: boolean;
  /**
   * Checked flag
   * @description
   * @type {boolean}
   * @memberof AutocompleteOptions
   */
  checked?: boolean;
  /**
   * A flag to determine if this control should be mandatory before submitting
   * @description
   * @type {boolean}
   * @memberof AutocompleteOptions
   */
  required?: boolean;
  /**
   * Component's source of data
   * @description
   * @type {EntityDataSource}
   * @memberof AutocompleteOptions
   */
  dataSource: EntityDataSource<T>;
  /**
   * Configuration options
   * @description
   * @type {DataGridEntityOptions}
   * @memberof AutocompleteOptions
   */
  entityOptions: DataGridEntityOptions;
}
