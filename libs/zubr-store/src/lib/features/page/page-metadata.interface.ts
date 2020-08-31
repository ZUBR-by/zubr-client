export interface PageMetadata {
  /**
   * Page title
   * @description
   * @type {string}
   * @memberof PageMetadata
   */
  title: string;
  /**
   * Page icon
   * @description
   * @type {string}
   * @memberof PageMetadata
   */
  favicon?: string;
  /**
   * Page tab flag
   * @description
   * @type {boolean}
   * @memberof PageMetadata
   */
  navigateToPageTab: boolean;
  /**
   * Dynamic page tab flag
   * @description
   * @type {boolean}
   * @memberof PageMetadata
   */
  dynamicPageTabView?: boolean;
  /**
   * Page entity
   * @description
   * @type {*}
   * @memberof PageMetadata
   */
  entity?: any;
  /**
   * Extra page tab flag
   * @description
   * @type {boolean}
   * @memberof PageMetadata
   */
  extraPageTabOpened?: boolean;
}
