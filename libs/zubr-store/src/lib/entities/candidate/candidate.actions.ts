import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { candidateFeatureKey } from '../../zubr-store.constants';
import { Candidate } from './candidate.interface';

/**
 * Common entity actions
 */
export const CandidateActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${candidateFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${candidateFeatureKey}] set entity error`, props<{
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
export const CandidateDataActions: {[name: string]: EntityAction<Candidate>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Candidate>(
    candidateFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
