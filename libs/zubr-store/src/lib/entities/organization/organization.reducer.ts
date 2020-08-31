import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { organizationFeatureKey, AppState } from '../../zubr-store.constants';
import { OrganizationState } from './organization-state.interface';
import { OrganizationActions } from './organization.actions';
import { Organization } from './organization.interface';

export const organizationAdapter: EntityAdapter<Organization> =
  createEntityAdapter<Organization>();

export const initialOrganizationState: OrganizationState =
  organizationAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const organizationReducer: ActionReducer<OrganizationState> = createReducer(

  initialOrganizationState,

  on(
    OrganizationActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    OrganizationActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfOrganizations: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[organizationFeatureKey],
  (state: OrganizationState) => state.totalCount
);

export const selectOrganizationEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[organizationFeatureKey],
  (state: OrganizationState) => state.entityError
);
