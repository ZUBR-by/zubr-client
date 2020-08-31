import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { ObserverRequest } from './observer-request.interface';

export interface ObserverRequestState extends EntityState<ObserverRequest> {
  /**
   * Total observerRequest count
   * @description
   * @type {number}
   * @memberof ObserverRequestState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof ObserverRequestState
   */
  entityError: BadRequest | null;
}
