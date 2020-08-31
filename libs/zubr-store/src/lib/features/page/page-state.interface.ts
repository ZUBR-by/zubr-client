import { PageTab } from '@zubr-client/zubr-store';

export interface PageState {
  /**
   * Page tab array
   * @description
   * @type {PageTab[]}
   * @memberof PageState
   */
  pageTabs: PageTab[];
  /**
   * Active page tab
   * @description
   * @type {PageTab}
   * @memberof PageState
   */
  activePageTab: PageTab;
}
