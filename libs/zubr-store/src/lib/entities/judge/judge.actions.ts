import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { judgeFeatureKey } from '../../zubr-store.constants';
import { Judge } from './judge.interface';

/**
 * Common entity actions
 */
export const JudgeActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${judgeFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${judgeFeatureKey}] set entity error`, props<{
      /**
       * Action payload
       */
      payload: BadRequest;
    }>()
  ),

};

export const JudgeDataActions: {[name: string]: EntityAction<Judge>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Judge>(
    judgeFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Judge>(
    judgeFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

};
