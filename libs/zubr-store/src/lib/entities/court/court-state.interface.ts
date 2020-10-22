import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Court } from './court.interface';

export interface CourtState extends EntityState<Court> {

  totalCount: number;

  entityError: BadRequest | null;
}
