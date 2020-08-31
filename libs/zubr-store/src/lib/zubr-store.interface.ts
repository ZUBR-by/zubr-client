import { DefaultDataServiceConfig } from '@ngrx/data';

/**
 * Zubr Store
 * @class ZubrStore
 * @export
 */
export abstract class ZubrStore {
  /**
   * Main data service configuration
   * @description
   * @type {DefaultDataServiceConfig}
   * @memberof ZubrStore
   */
  public dataServiceConfig: DefaultDataServiceConfig;
  /**
   * Alternate/optional data service configuration
   * @description
   * @type {DefaultDataServiceConfig}
   * @memberof ZubrStore
   */
  public altDataServiceConfig?: DefaultDataServiceConfig;
  /**
   * Max page tabs visible on page
   * @description
   * @type {number}
   * @memberof ZubrStore
   */
  public maxPageTabsVisible: number;
  /**
   * Max page tabs opened
   * @description
   * @type {number}
   * @memberof ZubrStore
   */
  public maxPageTabsOpened: number;
  /**
   * Max bookmarks per app
   * @description
   * @type {number}
   * @memberof ZubrStore
   */
  public maxBookmarks: number;
  /**
   * Snackbar default duration
   * @description
   * @type {number}
   * @memberof ZubrStore
   */
  public snackBarDuration: number;
}
