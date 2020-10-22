import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { decisionFeatureKey } from '../../zubr-store.constants';
import { Decision } from './decision.interface';

/**
 * Common entity actions
 */
export const DecisionActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${decisionFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${decisionFeatureKey}] set entity error`, props<{
      /**
       * Action payload
       */
      payload: BadRequest;
    }>()
  ),

};

export const DecisionDataActions: {[name: string]: EntityAction<Decision>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Decision>(
    decisionFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Decision>(
    decisionFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

};
