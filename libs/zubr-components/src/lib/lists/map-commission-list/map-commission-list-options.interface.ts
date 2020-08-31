import { Commission } from '@zubr-client/zubr-store';

export interface MapCommissionListOptions {
  /**
   * Commissions
   */
  commissions: Commission[];
  /**
   * Commission IDs
   */
  commissionIds: number[];
}
