import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Observer } from './observer.interface';

export interface ObserverState extends EntityState<Observer> {
  /**
   * Total observer count
   * @description
   * @type {number}
   * @memberof ObserverState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof ObserverState
   */
  entityError: BadRequest | null;
}
