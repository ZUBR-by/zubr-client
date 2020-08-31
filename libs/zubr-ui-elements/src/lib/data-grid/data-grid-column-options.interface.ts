export interface DataGridColumnOptions {
  /**
   * A label to be displayed for the Toggle component
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  label: string;
  /**
   * A prefix added to label used for translation labels (equals to label key)
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  labelPrefix?: string;
  /**
   * Column's display name
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  displayName: string;
  /**
   * Mobile visibility flag
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  visibleOnMobile?: boolean;
  /**
   * Display type
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  displayType?: string;
  /**
   * Button URL
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  buttonRouterLink?: string;
  /**
   * Filtering flag
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  disableFiltering?: boolean;
  /**
   * Pipe
   * @description
   * @type {string}
   * @memberof DataGridColumnOptions
   */
  pipe?: string;
  /**
   * Sorting flag
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  disableSorting?: boolean;
  /**
   * Font weight bold
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  titled?: boolean;
  /**
   * Display as badge
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  badged?: boolean;
  /**
   * fontSizeSmall
   * @description
   * @type {boolean}
   * @memberof DataGridColumnOptions
   */
  fontSizeSmall?: boolean;
}
