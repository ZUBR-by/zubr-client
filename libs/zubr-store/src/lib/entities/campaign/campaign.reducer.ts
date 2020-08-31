import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { campaignFeatureKey, AppState } from '../../zubr-store.constants';
import { CampaignState } from './campaign-state.interface';
import { CampaignActions } from './campaign.actions';
import { Campaign } from './campaign.interface';

export const campaignAdapter: EntityAdapter<Campaign> =
  createEntityAdapter<Campaign>();

export const initialCampaignState: CampaignState =
  campaignAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const campaignReducer: ActionReducer<CampaignState> = createReducer(

  initialCampaignState,

  on(
    CampaignActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    CampaignActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfCampaigns: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[campaignFeatureKey],
  (state: CampaignState) => state.totalCount
);

export const selectCampaignEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[campaignFeatureKey],
  (state: CampaignState) => state.entityError
);
