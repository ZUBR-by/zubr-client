import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  bookmarkActions,
  selectIsBookmarkExists, AppState, Member,
  MemberEntityService, Message, MessageEntityService, PageService
} from '@zubr-client/zubr-store';
import Map from 'ol/Map';
import { of, Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

export const messageMapSelector: string = 'messageMap';

/**
 * Station details view component
 * @description
 * @export
 * @class StationDetailPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-message-page',
  templateUrl: './message-detail-page.component.html',
})
export class MessageDetailPageComponent implements OnInit, OnDestroy {

  /**
   * Message loading
   */
  public messageLoading$: Observable<boolean>;
  /**
   * Entity
   */
  public entity$: Observable<Message>;

  /**
   * Subscription termination property
   * @description
   * @private
   */
  public _stop$: Subject<void> = new Subject();

  /**
   * error
   * @description
   */
  public viewError: boolean = false;

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _messageEntityService: MessageEntityService,
    private _memberEntityService: MemberEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   */
  public ngOnInit(): void {

    this._messageEntityService.clearCache();
    this._memberEntityService.clearCache();

    this.entity$ = this._pageService
      .entityPageInstance<Message>(
        this._activatedRoute,
        this._messageEntityService
      )
      .pipe(
        tap(entity => {
          entity ? this.viewError = false : this.viewError = true;
        }),
        takeUntil(this._stop$)
      );

    // Message loading state

    this.messageLoading$ = this._messageEntityService.loading$.pipe(
      delay(0),
      takeUntil(this._stop$)
    );
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
}
