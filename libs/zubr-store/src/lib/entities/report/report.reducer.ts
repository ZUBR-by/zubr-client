import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { reportFeatureKey, AppState } from '../../zubr-store.constants';
import { ReportState } from './report-state.interface';
import { ReportActions } from './report.actions';
import { Report } from './report.interface';

export const reportAdapter: EntityAdapter<Report> =
  createEntityAdapter<Report>();

export const initialReportState: ReportState =
  reportAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const reportReducer: ActionReducer<ReportState> = createReducer(

  initialReportState,

  on(
    ReportActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    ReportActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfReports: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[reportFeatureKey],
  (state: ReportState) => state.totalCount
);

export const selectReportEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[reportFeatureKey],
  (state: ReportState) => state.entityError
);
