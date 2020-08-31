import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { observerRequestFeatureKey } from '../../zubr-store.constants';
import { ObserverRequest } from './observer-request.interface';

/**
 * Common entity actions
 */
export const ObserverRequestActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${observerRequestFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${observerRequestFeatureKey}] set entity error`, props<{
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
export const ObserverRequestDataActions: {[name: string]: EntityAction<ObserverRequest>} = {

  QueryManySuccessAction: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<ObserverRequest>(
    observerRequestFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
