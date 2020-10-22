import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Decision } from './decision.interface';

export interface DecisionState extends EntityState<Decision> {

  totalCount: number;

  entityError: BadRequest | null;
}
