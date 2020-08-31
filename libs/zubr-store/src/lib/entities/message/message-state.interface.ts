import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Message } from './message.interface';

export interface MessageState extends EntityState<Message> {
  /**
   * Total message count
   * @description
   * @type {number}
   * @memberof MessageState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof MessageState
   */
  entityError: BadRequest | null;
}
