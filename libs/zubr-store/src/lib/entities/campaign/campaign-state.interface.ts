import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Campaign } from './campaign.interface';

export interface CampaignState extends EntityState<Campaign> {
  /**
   * Total campaign count
   * @description
   * @type {number}
   * @memberof CampaignState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof CampaignState
   */
  entityError: BadRequest | null;
}
