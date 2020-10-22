import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { courtFeatureKey } from '../../zubr-store.constants';
import { Court } from './court.interface';

export const CourtActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${courtFeatureKey}] set total count of entities`, props<{

      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${courtFeatureKey}] set entity error`, props<{
      payload: BadRequest;
    }>()
  ),
};
export const CourtDataActions: {[name: string]: EntityAction<Court>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Court>(
    courtFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Court>(
    courtFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),
};
