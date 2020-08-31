import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LanguageService } from '@zubr-client/zubr-common';
import { selectBookmarks, selectBookmarksCount, AppState } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';
import { Bookmark } from '../../../../../zubr-store/src/lib/features/bookmark/bookmark.interface';

/**
 * NotificationBar component
 * @description
 * @export
 * @class NotificationBarComponent
 */
@Component({
  selector: 'zubr-client-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
})
export class NotificationBarComponent {
  /**
   * Bookmarks count
   */
  public bookmarksCount$: Observable<number> = this._store$.select(selectBookmarksCount);
  /**
   * Bookmarks
   */
  public bookmarks$: Observable<Bookmark[]> = this._store$.pipe(select(selectBookmarks, 5));
  public constructor(
    private _store$: Store<AppState>,
    private _languageService: LanguageService
  ) {}
  /**
   *
   * @param _store$
   */
  /**
   * Change language
   */
  public changeLanguage(lang: string): void {
    this._languageService.changeLanguage(lang);
  }
}
