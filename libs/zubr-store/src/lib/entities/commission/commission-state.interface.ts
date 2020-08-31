import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Commission } from './commission.interface';

export interface CommissionState extends EntityState<Commission> {
  /**
   * Total commission count
   * @description
   * @type {number}
   * @memberof CommissionState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof CommissionState
   */
  entityError: BadRequest | null;
}
