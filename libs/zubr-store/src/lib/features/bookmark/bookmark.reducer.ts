import {
  createReducer,
  createSelector,
  on,
  ActionReducer,
  MemoizedSelector,
} from '@ngrx/store';
import {
  bookmarkFeatureKey,
  AppState
} from '../../zubr-store.constants';
import { BookmarkState } from './bookmark-state.interface';
import { bookmarkActions } from './bookmark.actions';
import { Bookmark } from './bookmark.interface';

export const initialBookmarkState: BookmarkState =
  localStorage.getItem(bookmarkFeatureKey) ?
    JSON.parse(localStorage.getItem(bookmarkFeatureKey)) :
    {
      bookmarks: [],
    };

export const bookmarkReducer: ActionReducer<BookmarkState> = createReducer(

  initialBookmarkState,

  on(
    bookmarkActions.CreateBookmarkAction, (state, action) => {

      const bookmarkToAdd: Bookmark = action.bookmark;
      const bookmarksToUpdate: Bookmark[] = state.bookmarks ? state.bookmarks : [];
      const existingBookmark: Bookmark = bookmarksToUpdate.find(bookmark => bookmark.url === bookmarkToAdd.url);

      if ((existingBookmark && existingBookmark.url) || bookmarksToUpdate.length >= 5) {
        return {
          ...state,
        };
      }

      bookmarksToUpdate.push(bookmarkToAdd);

      return {
        ...state,
        bookmarks: bookmarksToUpdate,
      };
    }
  ),

  on(
    bookmarkActions.RemoveBookmarkAction, (state, action) => {

      const bookmarkToRemoveUrl: string = action.url;
      const newBookmarks: Bookmark[] = state.bookmarks ? state.bookmarks.filter(bookmark => bookmark.url !== bookmarkToRemoveUrl) : [];

      return {
        ...state,
        bookmarks: newBookmarks,
      };
    }
  )

);

// tslint:disable-next-line:typedef
export const selectIsBookmarkExists = createSelector(
  (state: AppState) => state[bookmarkFeatureKey],
  (state: BookmarkState, url: string) => {

    if (state.bookmarks && state.bookmarks[0]) {
      return !!state.bookmarks.find(bookmark => bookmark.url === url);
    }

    return false;
  }
);

// tslint:disable-next-line:typedef
export const selectBookmarks = createSelector(
  (state: AppState) => state[bookmarkFeatureKey],
  (state: BookmarkState, limit: number = null) => {

    if (limit && limit > 0) {
      return state.bookmarks.slice(0, limit);
    }

    return state.bookmarks;
  }
);

export const selectBookmarksCount: MemoizedSelector<AppState, number> = createSelector(
  (state: AppState) => state[bookmarkFeatureKey],
  (state: BookmarkState) => {
    return state.bookmarks.length;
  }
);
