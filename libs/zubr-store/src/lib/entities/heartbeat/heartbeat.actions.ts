import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { heartbeatFeatureKey } from '../../zubr-store.constants';
import { Heartbeat } from './heartbeat.interface';

/**
 * Common entity actions
 */
export const HeartbeatActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${heartbeatFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${heartbeatFeatureKey}] set entity error`, props<{
      /**
       * Action payload
       */
      payload: BadRequest;
    }>()
  ),

};

/**
 * Entity data actions
 */
export const HeartbeatDataActions: {[name: string]: EntityAction<Heartbeat>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  QueryOneErrorAction: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.QUERY_BY_KEY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Heartbeat>(
    heartbeatFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
