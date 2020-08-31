import { Commission } from '../commission';

export interface Message {
  /**
   * Interface property
   */
  id: number;
  /**
   * Interface property
   */
  commission: Commission;
  /**
   * Interface property
   */
  attachments: {
    /**
     * Interface property
     */
    type: string;
    /**
     * Interface property
     */
    url: string;
  }[];
  /**
   * Interface property
   */
  categories: string[];
  /**
   * Interface property
   */
  initiative: number;
  /**
   * Interface property
   */
  approvedAt: string;
  /**
   * Interface property
   */
  deletedAt: string;
  /**
   * Interface property
   */
  highlightedAt: string;
  /**
   * Interface property
   */
  processedAt: string;
  /**
   * Interface property
   */
  description: string;
  /**
   * Interface property
   */
  commissionCode: string;
  /**
   * Interface property
   */
  comment: string;
  /**
   * Interface property
   */
  createdAt: string;
  /**
   * Interface property
   */
  fromOutside: boolean;
  /**
   * Interface property
   */
  observerUid: string;
  /**
   * Interface property
   */
  staff: string;
}
