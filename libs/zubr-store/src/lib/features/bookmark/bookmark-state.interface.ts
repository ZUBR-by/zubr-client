import { Bookmark } from './bookmark.interface';

export interface BookmarkState {
  /**
   * Bookmarks array
   * @description
   * @type {Bookmark[]}
   * @memberof BookmarkState
   */
  bookmarks: Bookmark[];
}
