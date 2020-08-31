import { createAction, props } from '@ngrx/store';
import { pageFeatureKey } from '../../zubr-store.constants';
import { PageActions } from './page-actions.interface';
import { PageTab } from './page-tab.interface';

/**
 * Common page actions
 */
export const pageActions: PageActions  = {

  ChangePageTabAction: createAction(
    `[${pageFeatureKey}] change page tab`, props<{
      /**
       * Action payload
       */
      payload: PageTab;
    }>()
  ),

  ClosePageTabAction: createAction(
    `[${pageFeatureKey}] close page tab`, props<{
      /**
       * Action payload
       */
      payload: PageTab;
    }>()
  ),

  PageTabChangedAction: createAction(
    `[${pageFeatureKey}] page tab changed`
  ),

  UpdatePageTabAction: createAction(
    `[${pageFeatureKey}] update page tab`, props<{
      /**
       * Action payload
       */
      payload: PageTab;
    }>()
  ),

  PageTabsLimitExceededAction: createAction(
    `[${pageFeatureKey}] the limit of opened page tabs exceeded`
  ),

  ChangePageTabRequestAction: createAction(
    `[${pageFeatureKey}] request for changing the page tab`, props<{
      /**
       * Action payload
       */
      payload: PageTab;
    }>()
  ),
};
