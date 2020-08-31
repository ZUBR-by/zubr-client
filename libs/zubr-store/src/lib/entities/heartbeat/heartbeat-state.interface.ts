import { EntityState } from '@ngrx/entity';
import { HeartbeatError } from './heartbeat-error.interface';
import { Heartbeat } from './heartbeat.interface';

export interface HeartbeatState extends EntityState<Heartbeat> {
  /**
   * Total heartbeat count
   * @description
   * @type {number}
   * @memberof HeartbeatState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof HeartbeatState
   */
  entityError: HeartbeatError | null;
}
