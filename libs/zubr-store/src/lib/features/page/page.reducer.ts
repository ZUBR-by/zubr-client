import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';
import { pageFeatureKey, AppState } from '../../zubr-store.constants';
import { PageState } from './page-state.interface';
import { PageTab } from './page-tab.interface';
import { pageActions } from './page.actions';

export const initialPageState: PageState =
  localStorage.getItem(pageFeatureKey) ?
    JSON.parse(localStorage.getItem(pageFeatureKey)) :
    {
      pageTabs: [],
      activePageTab: {},
    };

export const pageReducer: ActionReducer<PageState> = createReducer(

  initialPageState,

  on(
    pageActions.ChangePageTabAction, (state, action) => {

      let existingPageTabs: PageTab[] = state.pageTabs;
      const changePageTabAction: any = action;
      const existingPageTab: PageTab = state.pageTabs.find(
        pageTab => pageTab.url === changePageTabAction.payload.url
      );

      if (state.pageTabs.length >= 3) {
        const pageTabToRemove: PageTab = state.pageTabs[0];
        existingPageTabs = existingPageTabs.filter(
          pageTab => pageTab.url !== pageTabToRemove.url
        );
      }

      if (existingPageTab) {

        const index: number = state.pageTabs.indexOf(existingPageTab);

        if (index > 4) {
          const pageTabs: PageTab[] = existingPageTabs.filter(
            pageTab => pageTab.url !== existingPageTab.url
          );

          return {
            ...state,
            pageTabs: [
              changePageTabAction.payload,
              ...pageTabs,
            ],
            activePageTab: changePageTabAction.payload,
          };
        }

        return {
          ...state,
          activePageTab: changePageTabAction.payload,
        };

      }

      return {
        ...state,
        pageTabs: [
          ...existingPageTabs,
          changePageTabAction.payload,
        ],
        activePageTab: changePageTabAction.payload,
      };
    }
  ),

  on(
    pageActions.ClosePageTabAction, (state, action) => {

      const closePageTabAction: any = action;
      const isActivePageTabClosed: boolean
        = state.activePageTab.url === closePageTabAction.payload.url;
      const pageTabs: PageTab[] = state.pageTabs.filter(
        foundedPageTab => foundedPageTab.url !== closePageTabAction.payload.url
      );
      const activePageTab: PageTab = isActivePageTabClosed ?
        pageTabs[pageTabs.length - 1] : state.activePageTab;

      return {
        ...state,
        pageTabs,
        activePageTab,
      };
    }

  ),

  on(
    pageActions.UpdatePageTabAction, (state, action) => {

      const payload: PageTab = action.payload;
      const pageTabs: PageTab[] = state.pageTabs.slice();
      const updatePageTab: PageTab = pageTabs.find(
        pageTab => pageTab.url === payload.url);
      const index: number = pageTabs.indexOf(updatePageTab);

      pageTabs[index] = payload;

      return {
        ...state,
        pageTabs,
      };
    }

  )

);

export const selectPageState: MemoizedSelector<object, PageState> = createFeatureSelector<PageState>(
  pageFeatureKey
);

export const selectActivePageTab: MemoizedSelector<AppState, PageTab> = createSelector(
  (state: AppState) => state[pageFeatureKey],
  (state: PageState) => state.activePageTab
);
