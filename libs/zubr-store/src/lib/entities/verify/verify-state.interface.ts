import { EntityState } from '@ngrx/entity';
import { VerifyError } from './verify-error.interface';
import { Verify } from './verify.interface';

export interface VerifyState extends EntityState<Verify> {
  /**
   * Total verify count
   * @description
   * @type {number}
   * @memberof VerifyState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof VerifyState
   */
  entityError: VerifyError | null;
}
