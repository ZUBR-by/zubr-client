import { createAction, props } from '@ngrx/store';
import { bookmarkFeatureKey } from '../../zubr-store.constants';
import { BookmarkActions } from './bookmark-actions.interface';
import { Bookmark } from './bookmark.interface';

/**
 * Common bookmark actions
 */
export const bookmarkActions: BookmarkActions  = {

  CreateBookmarkAction: createAction(
    `[${bookmarkFeatureKey}] create bookmark`, props<{
      /**
       * Action payload
       */
      bookmark: Bookmark;
    }>()
  ),

  CreateBookmarkSuccessAction: createAction(
    `[${bookmarkFeatureKey}] bookmark created`
  ),

  CreateBookmarkFailureAction: createAction(
    `[${bookmarkFeatureKey}] bookmark failed to create`
  ),

  RemoveBookmarkAction: createAction(
    `[${bookmarkFeatureKey}] remove bookmark`, props<{
      /**
       * Action payload
       */
      url: string;
    }>()
  ),

  RemoveBookmarkSuccessAction: createAction(
    `[${bookmarkFeatureKey}] bookmark created`
  ),

  RemoveBookmarkFailureAction: createAction(
    `[${bookmarkFeatureKey}] bookmark failed to create`
  ),

  BookmarksLimitExceededAction: createAction(
    `[${bookmarkFeatureKey}] the limit of bookmarks exceeded`
  ),
};
