import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Organization } from './organization.interface';

export interface OrganizationState extends EntityState<Organization> {
  /**
   * Total organization count
   * @description
   * @type {number}
   * @memberof OrganizationState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof OrganizationState
   */
  entityError: BadRequest | null;
}
