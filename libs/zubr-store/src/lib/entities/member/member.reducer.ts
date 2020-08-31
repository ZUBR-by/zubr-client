import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { memberFeatureKey, AppState } from '../../zubr-store.constants';
import { MemberState } from './member-state.interface';
import { MemberActions } from './member.actions';
import { Member } from './member.interface';

export const memberAdapter: EntityAdapter<Member> =
  createEntityAdapter<Member>();

export const initialMemberState: MemberState =
  memberAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const memberReducer: ActionReducer<MemberState> = createReducer(

  initialMemberState,

  on(
    MemberActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    MemberActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfMembers: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[memberFeatureKey],
  (state: MemberState) => state.totalCount
);

export const selectMemberEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[memberFeatureKey],
  (state: MemberState) => state.entityError
);
