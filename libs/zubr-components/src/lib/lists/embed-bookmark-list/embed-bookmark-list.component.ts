import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectBookmarks, selectBookmarksCount, AppState, Bookmark } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';

/**
 * Bookmark list component
 * @description
 * @export
 * @class EmbedMemberListComponent
 */
@Component({
  selector: 'zubr-client-embed-bookmark-list',
  templateUrl: './embed-bookmark-list.component.html',
})
export class EmbedBookmarkListComponent {

  /**
   * Bookmarks count
   */
  public bookmarksCount$: Observable<number> = this._store$.select(selectBookmarksCount);
  /**
   * Bookmarks
   */
  public bookmarks$: Observable<Bookmark[]> = this._store$.pipe(select(selectBookmarks, 5));

  public constructor(
    private _store$: Store<AppState>
  ) {}
}
