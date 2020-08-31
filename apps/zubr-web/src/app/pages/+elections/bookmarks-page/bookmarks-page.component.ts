import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageService } from '@zubr-client/zubr-common';
import { AppState } from '@zubr-client/zubr-store';
import { Subject } from 'rxjs';

/**
 * Bookmarks component
 * @description
 * @export
 * @class BookmarksPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
})
export class BookmarksPageComponent implements OnInit, OnDestroy {
  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _store$: Store<AppState>,
    private _languageService: LanguageService
  ) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof BookmarksPageComponent
   */
  public ngOnInit(): void {}

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof BookmarksPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  /**
   * Change language
   */
  public changeLanguage(lang: string): void {
    this._languageService.changeLanguage(lang);
  }
}
