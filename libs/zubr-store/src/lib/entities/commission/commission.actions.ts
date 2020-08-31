import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { commissionFeatureKey } from '../../zubr-store.constants';
import { Commission } from './commission.interface';

/**
 * Common entity actions
 */
export const CommissionActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${commissionFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${commissionFeatureKey}] set entity error`, props<{
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
export const CommissionDataActions: {[name: string]: EntityAction<Commission>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Commission>(
    commissionFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
