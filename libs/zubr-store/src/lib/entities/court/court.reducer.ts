import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { courtFeatureKey, AppState } from '../../zubr-store.constants';
import { CourtState } from './court-state.interface';
import { CourtActions } from './court.actions';
import { Court } from './court.interface';

export const courtAdapter: EntityAdapter<Court> =
  createEntityAdapter<Court>();

export const initialCourtState: CourtState =
  courtAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const courtReducer: ActionReducer<CourtState> = createReducer(

  initialCourtState,

  on(
    CourtActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    CourtActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfCourts: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[courtFeatureKey],
  (state: CourtState) => state.totalCount
);

export const selectCourtEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[courtFeatureKey],
  (state: CourtState) => state.entityError
);
