import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { observerRequestFeatureKey, AppState } from '../../zubr-store.constants';
import { ObserverRequestState } from './observer-request-state.interface';
import { ObserverRequestActions } from './observer-request.actions';
import { ObserverRequest } from './observer-request.interface';

export const observerRequestAdapter: EntityAdapter<ObserverRequest> =
  createEntityAdapter<ObserverRequest>();

export const initialObserverRequestState: ObserverRequestState =
  observerRequestAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const observerRequestReducer: ActionReducer<ObserverRequestState> = createReducer(

  initialObserverRequestState,

  on(
    ObserverRequestActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    ObserverRequestActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfObserverRequests: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[observerRequestFeatureKey],
  (state: ObserverRequestState) => state.totalCount
);

export const selectObserverRequestEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[observerRequestFeatureKey],
  (state: ObserverRequestState) => state.entityError
);
