import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Judge } from './judge.interface';

export interface JudgeState extends EntityState<Judge> {

  totalCount: number;

  entityError: BadRequest | null;
}
