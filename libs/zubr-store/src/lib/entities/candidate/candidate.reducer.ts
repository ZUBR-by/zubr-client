import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { candidateFeatureKey, AppState } from '../../zubr-store.constants';
import { CandidateState } from './candidate-state.interface';
import { CandidateActions } from './candidate.actions';
import { Candidate } from './candidate.interface';

export const candidateAdapter: EntityAdapter<Candidate> =
  createEntityAdapter<Candidate>();

export const initialCandidateState: CandidateState =
  candidateAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const candidateReducer: ActionReducer<CandidateState> = createReducer(

  initialCandidateState,

  on(
    CandidateActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    CandidateActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfCandidates: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[candidateFeatureKey],
  (state: CandidateState) => state.totalCount
);

export const selectCandidateEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[candidateFeatureKey],
  (state: CandidateState) => state.entityError
);
