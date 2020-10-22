import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { decisionFeatureKey, AppState } from '../../zubr-store.constants';
import { DecisionState } from './decision-state.interface';
import { DecisionActions } from './decision.actions';
import { Decision } from './decision.interface';

export const decisionAdapter: EntityAdapter<Decision> =
  createEntityAdapter<Decision>();

export const initialDecisionState: DecisionState =
  decisionAdapter.getInitialState({

    totalCount: null,
    entityError: null,

  });

export const decisionReducer: ActionReducer<DecisionState> = createReducer(

  initialDecisionState,

  on(
    DecisionActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    DecisionActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfDecisions: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[decisionFeatureKey],
  (state: DecisionState) => state.totalCount
);

export const selectDecisionEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[decisionFeatureKey],
  (state: DecisionState) => state.entityError
);
