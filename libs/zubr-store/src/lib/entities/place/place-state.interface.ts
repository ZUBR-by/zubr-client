import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Place } from './place.interface';

export interface PlaceState extends EntityState<Place> {
  /**
   * Total place count
   * @description
   * @type {number}
   * @memberof PlaceState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof PlaceState
   */
  entityError: BadRequest | null;
}
