import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { observerFeatureKey, AppState } from '../../zubr-store.constants';
import { ObserverState } from './observer-state.interface';
import { ObserverActions } from './observer.actions';
import { Observer } from './observer.interface';

export const observerAdapter: EntityAdapter<Observer> =
  createEntityAdapter<Observer>();

export const initialObserverState: ObserverState =
  observerAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const observerReducer: ActionReducer<ObserverState> = createReducer(

  initialObserverState,

  on(
    ObserverActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    ObserverActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfObservers: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[observerFeatureKey],
  (state: ObserverState) => state.totalCount
);

export const selectObserverEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[observerFeatureKey],
  (state: ObserverState) => state.entityError
);
