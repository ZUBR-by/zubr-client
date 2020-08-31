import { ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';

export interface BookmarkActions {
  /**
   * Create bookmark
   */
  CreateBookmarkAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Bookmark created successfully
   */
  CreateBookmarkSuccessAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Bookmark failed to create
   */
  CreateBookmarkFailureAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Remove bookmark
   */
  RemoveBookmarkAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Bookmark removed successfully
   */
  RemoveBookmarkSuccessAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Bookmark failed to remove
   */
  RemoveBookmarkFailureAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Bookmarks limit exceed
   */
  BookmarksLimitExceededAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
}
