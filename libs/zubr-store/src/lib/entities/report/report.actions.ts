import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { reportFeatureKey } from '../../zubr-store.constants';
import { Report } from './report.interface';

/**
 * Common entity actions
 */
export const ReportActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${reportFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${reportFeatureKey}] set entity error`, props<{
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
export const ReportDataActions: {[name: string]: EntityAction<Report>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Report>(
    reportFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
