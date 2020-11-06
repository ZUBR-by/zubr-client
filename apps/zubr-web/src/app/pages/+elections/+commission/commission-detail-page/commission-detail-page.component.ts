import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  MessageFormComponent,
  ObserverFormComponent, PublicReportFormComponent, ReportFormComponent
} from '@zubr-client/zubr-components';
import {
  bookmarkActions,
  selectIsBookmarkExists, selectTotalCountOfMessages, AppState,
  Commission, CommissionEntityService, Member,
  MemberEntityService, Message, MessageEntityService, PageService
} from '@zubr-client/zubr-store';
import { DataGridOptions, EntityDataSource } from '@zubr-client/zubr-ui-elements';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import View from 'ol/View';
import { of, Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

export const commissionMapSelector: string = 'commissionMap';

/**
 * Station details view component
 * @description
 * @export
 * @class StationDetailPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-commission-page',
  templateUrl: './commission-detail-page.component.html',
})
export class CommissionDetailPageComponent implements OnInit, OnDestroy {
  /**
   * map element
   * @description
   */
  @ViewChild(commissionMapSelector, { static: false })
  public set mapElement(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.mapElementRef = content;
    }
  }
  /**
   * error
   * @description
   */
  public viewError: boolean = false;
  /**
   * Station entity
   * @description
   */
  public entity$: Observable<Commission>;
  /**
   * Member entity
   * @description
   */
  public members$: Observable<Member[]>;
  /**
   * Component readiness status
   * @description
   */
  public commissionLoading$: Observable<boolean>;
  /**
   * Component readiness status
   * @description
   */
  public membersLoading$: Observable<boolean>;
  /**
   * map
   * @description
   */
  public map: Map;
  /**
   * latitude
   * @description
   */
  public latitude: number = 53.7098;
  /**
   * longitude
   * @description
   */
  public longitude: number = 27.9534;
  /**
   * Subscription termination property
   * @description
   * @private
   */
  public _stop$: Subject<void> = new Subject();

  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   */
  public dataGridOptions: DataGridOptions<Message> = {
    dataSource: new EntityDataSource(
      this._messageEntityService // custom server-side entity data source
    ),
    columns: [
      {
        label: 'commissionCode',
        displayName: 'commission',
        titled: true,
        visibleOnMobile: true,
        fontSizeSmall: true,
      },
      {
        label: 'categories',
        displayName: 'categories',
        labelPrefix: 'violation_type',
        displayType: 'array',
      },
      {
        label: 'description',
        displayName: 'description',
        visibleOnMobile: true,
        fontSizeSmall: true,
      },
      {
        label: 'createdAt',
        displayName: 'date',
        visibleOnMobile: true,
        displayType: 'datetime',
      },
      {
        label: 'initiative',
        displayName: 'initiative',
        labelPrefix: 'initiative',
        badged: true,
      },
    ],
    entityOptions: {
      count: 10, // initial count of records per page
      page: 1, // initial page number
      searchBy: '', // search by specific key, but default it's null
      search: '',
    },
    routerLinkPrefix: '/elections/message/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(undefined), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'commissionCode', // filter key
    staticQueryParams: [
      {
        key: 'exists[approvedAt]',
        value: 'true',
      },
      {
        key: 'sort[createdAt]',
        value: 'desc',
      },
    ],
    emptyMessageTitle: 'no_messages_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfMessages),
  };

  /**
   * Bookmark
   * @description
   */
  public isBookmarked$: Observable<boolean> = this._router.events.pipe(
    startWith(new NavigationEnd(0, this._router.url, this._router.url)),
    filter(event => event instanceof NavigationEnd),
    switchMap((event: NavigationEnd) => {
      return this._store$.pipe(
        select(selectIsBookmarkExists, event.url),
        takeUntil(this._stop$)
      );
    }),
    takeUntil(this._stop$)
  );
  /**
   * map element ref
   * @description
   */
  private mapElementRef: ElementRef;

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _commissionEntityService: CommissionEntityService,
    private _memberEntityService: MemberEntityService,
    private _messageEntityService: MessageEntityService,
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

    this._commissionEntityService.clearCache();
    this._memberEntityService.clearCache();

    this.entity$ = this._pageService
      .entityPageInstance<Commission>(
        this._activatedRoute,
        this._commissionEntityService
      )
      .pipe(
        tap((entity: Commission) => {

          if (entity) {

            this.viewError = false;
            this.latitude = entity.latitude;
            this.longitude = entity.longitude;

          } else {

            this.viewError = true;

          }

          return entity;

        }),
        mergeMap((entity: Commission, index: number) => {

          if (entity) {
            this.dataGridOptions.additionalFilterControl.setValue(entity.code);
            this.members$ = this._memberEntityService.getWithQuery({
              'commission.id': entity.id.toString(),
              'pagination': 'false',
            }).pipe(
              takeUntil(this._stop$)
            );
          }

          return of(entity);
        }),
        takeUntil(this._stop$)
      );

    // Commission loading state

    this.commissionLoading$ = this._commissionEntityService.loading$.pipe(
      delay(0),
      tap(
        () => {

          setTimeout(() => {

            if (this.mapElementRef) {
              this.mapElementRef.nativeElement.innerHTML = '';
            }

            this.map = new Map({
              target: commissionMapSelector,
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
              ],
              view: new View({
                center: fromLonLat([this.longitude, this.latitude]),
                zoom: 16,
                enableRotation: false,
              }),
              interactions: [],
              controls: [],

            });

            const updatedView: View = this.map.getView();
            const marker: VectorLayer = new VectorLayer({
              source: new VectorSource({
                features: [
                  new Feature({
                    geometry: new Point(fromLonLat([
                      this.longitude, this.latitude,
                    ])),
                  }),
                ],
              }),
              style: new Style({
                image: new Icon({
                  src: './assets/images/station_icon.svg',
                }),
              }),
            });

            this.map.addLayer(marker);
            this.map.setView(
              updatedView
            );

            // const d: Document = document;
            // const s: any = d.createElement('script');
            // s.src = 'https://https-zubr-in.disqus.com/embed.js';
            // s.setAttribute('data-timestamp', new Date().toString());
            // (d.head || d.body).appendChild(s);

            },       500
          );
        }
      ),
      takeUntil(this._stop$)
    );

    this.membersLoading$ = this._memberEntityService.loading$;

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
   * Add bookmark
   * @description
   */
  public addBookmark(name: string): void {
    this._store$.dispatch(bookmarkActions.CreateBookmarkAction({
      bookmark: {
        url: this._router.url,
        type: 'commission',
        label: name,
      },
    }));
  }

  /**
   * Remove bookmark
   * @description
   */
  public removeBookmark(): void {
    this._store$.dispatch(bookmarkActions.RemoveBookmarkAction({
      url: this._router.url,
    }));
  }

  /**
   * Delete confirmation dialog handling
   * Gives user possibility to confirm or cancel deletion
   * @memberof PatientFormComponent
   */
  public onObserverModalOpened(): void {
    let dialogSub: Subscription = new Subscription();

    const dialogRef: MatDialogRef<ObserverFormComponent> =
      this._dialog.open(ObserverFormComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: {
          members: this.members$,
          commission: this.entity$,
        },
      });

    dialogSub = dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        // test
      }
      dialogSub.unsubscribe();
    });
  }

  /**
   * On register violation
   */
  public onRegisterViolationModal(): void {

    let dialogSub: Subscription = new Subscription();

    const dialogRef: MatDialogRef<MessageFormComponent> =
      this._dialog.open(MessageFormComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: {
          members: this.members$,
          commission: this.entity$,
        },
      });

    dialogSub = dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        // test
      }
      dialogSub.unsubscribe();
    });
  }
  /**
   * On register violation
   */
  public onReportModal(): void {

    let dialogSub: Subscription = new Subscription();

    const dialogRef: MatDialogRef<ReportFormComponent> =
      this._dialog.open(ReportFormComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: {
          members: this.members$,
          commission: this.entity$,
        },
      });

    dialogSub = dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        // test
      }
      dialogSub.unsubscribe();
    });
  }
  /**
   * On register violation
   */
  public onPublicReportModal(): void {

    let dialogSub: Subscription = new Subscription();

    const dialogRef: MatDialogRef<PublicReportFormComponent> =
      this._dialog.open(PublicReportFormComponent, {
        autoFocus: false,
        maxHeight: '90vh',
        data: {
          members: this.members$,
          commission: this.entity$,
        },
      });

    dialogSub = dialogRef.afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        // test
      }
      dialogSub.unsubscribe();
    });
  }
}
