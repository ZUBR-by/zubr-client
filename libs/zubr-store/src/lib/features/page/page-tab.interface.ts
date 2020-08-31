import { Data } from '@angular/router';
import { PageMetadata } from './page-metadata.interface';

export interface PageTab {
  /**
   * Page tab url
   * @description
   * @type {string}
   * @memberof PageTab
   */
  url: string;
  /**
   * Page tab metadata
   * @description
   * @type {(PageMetadata | Data)}
   * @memberof PageTab
   */
  metadata: PageMetadata | Data;
}
