import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { verifyFeatureKey, AppState } from '../../zubr-store.constants';
import { VerifyError } from './verify-error.interface';
import { VerifyState } from './verify-state.interface';
import { VerifyActions } from './verify.actions';
import { Verify } from './verify.interface';

export const verifyAdapter: EntityAdapter<Verify> =
  createEntityAdapter<Verify>();

export const initialVerifyState: VerifyState =
  verifyAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const verifyReducer: ActionReducer<VerifyState> = createReducer(

  initialVerifyState,

  on(
    VerifyActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    VerifyActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <VerifyError> action.payload,
    })
  )

);

export const selectVerifyEntityError: MemoizedSelector<AppState, VerifyError> = createSelector(
  (state: AppState) => state[verifyFeatureKey],
  (state: VerifyState) => state.entityError
);
