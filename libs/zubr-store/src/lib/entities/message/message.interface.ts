import { Commission } from '../commission';

export interface Message {

  id: number;

  commission: Commission;

  attachments: {

    type: string;

    url: string;
  }[];

  categories: string[];

  initiative: number;

  approvedAt: string;

  deletedAt: string;

  highlightedAt: string;

  processedAt: string;

  description: string;

  commissionCode: string;

  comment: string;

  createdAt: string;

  fromOutside: boolean;

  observerUid: string;

  staff: string;
}
