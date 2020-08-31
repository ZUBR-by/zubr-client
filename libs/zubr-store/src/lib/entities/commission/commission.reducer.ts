import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { commissionFeatureKey, AppState } from '../../zubr-store.constants';
import { CommissionState } from './commission-state.interface';
import { CommissionActions } from './commission.actions';
import { Commission } from './commission.interface';

export const commissionAdapter: EntityAdapter<Commission> =
  createEntityAdapter<Commission>();

export const initialCommissionState: CommissionState =
  commissionAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const commissionReducer: ActionReducer<CommissionState> = createReducer(

  initialCommissionState,

  on(
    CommissionActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    CommissionActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfCommissions: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[commissionFeatureKey],
  (state: CommissionState) => state.totalCount
);

export const selectCommissionEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[commissionFeatureKey],
  (state: CommissionState) => state.entityError
);
