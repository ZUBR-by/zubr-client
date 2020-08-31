import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Member } from './member.interface';

export interface MemberState extends EntityState<Member> {
  /**
   * Total member count
   * @description
   * @type {number}
   * @memberof MemberState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof MemberState
   */
  entityError: BadRequest | null;
}
