import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { placeFeatureKey, AppState } from '../../zubr-store.constants';
import { PlaceState } from './place-state.interface';
import { PlaceActions } from './place.actions';
import { Place } from './place.interface';

export const placeAdapter: EntityAdapter<Place> =
  createEntityAdapter<Place>();

export const initialPlaceState: PlaceState =
  placeAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const placeReducer: ActionReducer<PlaceState> = createReducer(

  initialPlaceState,

  on(
    PlaceActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    PlaceActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfPlaces: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[placeFeatureKey],
  (state: PlaceState) => state.totalCount
);

export const selectPlaceEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[placeFeatureKey],
  (state: PlaceState) => state.entityError
);
