export interface ListOperationsPanelOptions {
  /**
   * Primary button flag
   * @description
   * @type {{
   *     enabled: boolean;
   *     label: string;
   *     routerLink: string;
   *     appearance: string
   *   }}
   * @memberof ListOperationsPanelOptions
   */
  primaryButton?: {
    /**
     * Primary button's enabled flag
     * @description
     * @type {boolean}
     */
    enabled: boolean;
    /**
     * Primary button's icon
     * @description
     * @type {string}
     */
    icon?: string;
    /**
     * Primary button's label
     * @description
     * @type {string}
     */
    label: string;
    /**
     * Primary button's router link
     * @description
     * @type {string}
     */
    routerLink: string;
    /**
     * Button's visual appearance style override.
     * @description
     * @type {string}
     */
    appearance?: string;
    /**
     * CSS class
     * @description
     * @type {string}
     */
    class?: string;
  };
  /**
   * Import button flag
   * @description
   * @type {{
   *     enabled: boolean;
   *     entity: string;
   *   }}
   * @memberof ListOperationsPanelOptions
   */
  importButton?: {
    /**
     * Import button's enabled flag
     * @description
     * @type {boolean}
     */
    enabled: boolean;
    /**
     * Importable entity
     * @description
     * @type {string}
     */
    entity: string;
  };
  /**
   * Search
   * @description
   * @type {{
   *     enabled: boolean;
   *   }}
   * @memberof ListOperationsPanelOptions
   */
  searchFilter?: {
    /**
     * Import button's enabled flag
     * @description
     * @type {boolean}
     */
    enabled: boolean;
  };
  /**
   * CSS class
   * @description
   * @type {string}
   */
  searchFieldClass?: string;

  /**
   * Placeholder
   * @description
   * @type {string}
   */
  placeholder?: string;
}
