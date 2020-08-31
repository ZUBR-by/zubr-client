import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, createSelector, on, MemoizedSelector } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { messageFeatureKey, AppState } from '../../zubr-store.constants';
import { MessageState } from './message-state.interface';
import { MessageActions } from './message.actions';
import { Message } from './message.interface';

export const messageAdapter: EntityAdapter<Message> =
  createEntityAdapter<Message>();

export const initialMessageState: MessageState =
  messageAdapter.getInitialState({

    // additional entity state properties

    totalCount: null,
    entityError: null,

  });

export const messageReducer: ActionReducer<MessageState> = createReducer(

  initialMessageState,

  on(
    MessageActions.SetTotalCountAction,
    (state, action) => ({
      ...state,
      totalCount: <number> action.payload,
    })
  ),

  on(
    MessageActions.SetEntityErrorAction,
    (state, action) => ({
      ...state,
      entityError: <BadRequest> action.payload,
    })
  )

);

export const selectTotalCountOfMessages: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[messageFeatureKey],
  (state: MessageState) => state.totalCount
);

export const selectMessageEntityError: MemoizedSelector<AppState, BadRequest> = createSelector(
  (state: AppState) => state[messageFeatureKey],
  (state: MessageState) => state.entityError
);
