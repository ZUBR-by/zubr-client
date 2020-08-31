import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  pageActions,
  selectPageState,
  AppState,
  PageState,
  PageTab
} from '@zubr-client/zubr-store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Page tabs component
 * @description
 * @export
 * @class PageTabsComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-page-tabs',
  templateUrl: './page-tabs.component.html',
})
export class PageTabsComponent implements OnInit, OnDestroy {
  /**
   * Opened page tabs
   * @description
   * @type {PageTab[]}
   * @memberof PageTabsComponent
   */
  public pageTabs: PageTab[] = [];
  /**
   * Active page tab
   * @description
   * @type {PageTab}
   * @memberof PageTabsComponent
   */
  public activePageTab: PageTab;
  /**
   * Page state
   * @description
   * @type {Observable<PageState>}
   * @memberof PageTabsComponent
   */
  public pageState$: Observable<PageState>;

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof StationDetailPageComponent
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _store$: Store<AppState>,
    private titleService: Title,
    private translateService: TranslateService
  ) {
    this.pageState$ = this._store$.select(selectPageState);
  }

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof StationDetailPageComponent
   */
  public ngOnInit(): void {
    this.pageState$
      .pipe(takeUntil(this._stop$))
      .subscribe((pageState: PageState) => {
        this.pageTabs = pageState.pageTabs;
        this.activePageTab = pageState.activePageTab;

        const title: string = pageState.pageTabs.find((tab: PageTab) => tab.url === pageState.activePageTab.url).metadata.title;
        this.translateService.get(title).subscribe(translation => {
          this.titleService.setTitle(`${translation} | ZUBR`);
        });
      });
  }

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof StationDetailPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  /**
   * Close page tab
   * @description
   * @param {PageTab} pageTab
   * @param {Event} e
   * @memberof PageTabsComponent
   */
  public close(pageTab: PageTab, e: Event): void {
    e.preventDefault();
    this._store$.dispatch(pageActions.ClosePageTabAction({
      payload: pageTab,
    }));
  }
}
