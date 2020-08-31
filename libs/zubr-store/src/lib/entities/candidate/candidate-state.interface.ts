import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Candidate } from './candidate.interface';

export interface CandidateState extends EntityState<Candidate> {
  /**
   * Total candidate count
   * @description
   * @type {number}
   * @memberof CandidateState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof CandidateState
   */
  entityError: BadRequest | null;
}
