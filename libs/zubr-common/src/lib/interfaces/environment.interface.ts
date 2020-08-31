import { ZubrStore } from '@zubr-client/zubr-store';

export interface Environment {
  /**
   * Production flag
   * @description
   * @type {boolean}
   * @memberof Environment
   */
  production: boolean;
  /**
   * Store config
   * @description
   * @type {ZubrStore}
   * @memberof Environment
   */
  zubrStoreConfig: ZubrStore;
}
