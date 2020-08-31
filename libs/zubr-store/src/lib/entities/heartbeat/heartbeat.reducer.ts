import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { heartbeatFeatureKey, AppState } from '../../zubr-store.constants';
import { HeartbeatError } from './heartbeat-error.interface';
import { HeartbeatState } from './heartbeat-state.interface';
import { HeartbeatActions } from './heartbeat.actions';
import { Heartbeat } from './heartbeat.interface';

export const heartbeatAdapter: EntityAdapter<Heartbeat> =
  createEntityAdapter<Heartbeat>();

export const initialHeartbeatState: HeartbeatState =
  heartbeatAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const heartbeatReducer: ActionReducer<HeartbeatState> = createReducer(

  initialHeartbeatState,

  on(
    HeartbeatActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    HeartbeatActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <HeartbeatError> action.payload,
    })
  )

);

export const selectHeartbeatEntityError: MemoizedSelector<AppState, HeartbeatError> = createSelector(
  (state: AppState) => state[heartbeatFeatureKey],
  (state: HeartbeatState) => state.entityError
);
