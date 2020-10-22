import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { judgeFeatureKey, AppState } from '../../zubr-store.constants';
import { JudgeState } from './judge-state.interface';
import { JudgeActions } from './judge.actions';
import { Judge } from './judge.interface';

export const judgeAdapter: EntityAdapter<Judge> =
  createEntityAdapter<Judge>();

export const initialJudgeState: JudgeState =
  judgeAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const judgeReducer: ActionReducer<JudgeState> = createReducer(

  initialJudgeState,

  on(
    JudgeActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    JudgeActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfJudges: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[judgeFeatureKey],
  (state: JudgeState) => state.totalCount
);

export const selectJudgeEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[judgeFeatureKey],
  (state: JudgeState) => state.entityError
);
