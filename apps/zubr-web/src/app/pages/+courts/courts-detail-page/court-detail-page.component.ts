import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  AppState,
  Court, CourtEntityService,
  Judge, JudgeEntityService,
  Decision, DecisionEntityService, selectTotalCountOfDecisions,
  PageService
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
import { of, Observable, Subject} from 'rxjs';
import { delay, mergeMap, takeUntil, tap } from 'rxjs/operators';

export const courtMapSelector: string = 'courtMap';

@Component({
  selector: 'zubr-client-court-page',
  templateUrl: './court-detail-page.component.html',
})
export class CourtDetailPageComponent implements OnInit, OnDestroy {
  @ViewChild(courtMapSelector, { static: false })
  public set mapElement(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.mapElementRef = content;
    }
  }

  public viewError: boolean = false;

  public entity$: Observable<Court>;

  public judges$: Observable<Judge[]>;

  public courtLoading$: Observable<boolean>;

  public judgesLoading$: Observable<boolean>;

  public map: Map;

  public latitude: number = 53.7098;

  public longitude: number = 27.9534;

  public _stop$: Subject<void> = new Subject();

  public dataGridOptions: DataGridOptions<Decision> = {
    dataSource: new EntityDataSource(this._messageEntityService),
    columns: [
      {
        label: 'article',
        displayName: 'article',
        visibleOnMobile: true
      },
      {
        label: 'aftermathType',
        displayName: 'aftermathType',
        visibleOnMobile: true
      },
      {
        label: 'timestamp',
        displayName: 'date',
        visibleOnMobile: true,
        displayType: 'date',
      },
    ],
    entityOptions: {
      count: 10,
      page: 1,
      searchBy: '',
      search: '',
    },
    routerLinkPrefix: '/elections/message/',
    routerLinkKey: 'id',
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''),
    searchKeyControl: new FormControl(''),
    additionalFilterControl: new FormControl(undefined),
    additionalFilterControl2: new FormControl(undefined),
    additionalFilterKey: 'court.id',
    emptyMessageTitle: 'no_messages_found',
    totalPageCount: this._store$.select<number>(selectTotalCountOfDecisions),
  };

  private mapElementRef: ElementRef;

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _courtEntityService: CourtEntityService,
    private _judgeEntityService: JudgeEntityService,
    private _messageEntityService: DecisionEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {

    this._courtEntityService.clearCache();
    this._judgeEntityService.clearCache();

    // Initialize page tab instance base on a single data entity

    this.entity$ = this._pageService
      .entityPageTabInstance<Court>(
        this._activatedRoute,
        this._courtEntityService,
        ['description']
      )
      .pipe(
        tap((entity: Court) => {

          if (entity) {
            this.viewError = false;
            this.latitude = entity.latitude;
            this.longitude = entity.longitude;
          } else {
            this.viewError = true;
          }

          return entity;

        }),
        mergeMap((entity: Court, index: number) => {
          if (entity) {
            this.dataGridOptions.additionalFilterControl.setValue(entity.id);
            this.judges$ = this._judgeEntityService.getWithQuery({
              'comment': entity.id.toString(),
              'pagination': 'false',
            }).pipe(
              takeUntil(this._stop$)
            );
          }

          return of(entity);
        }),
        takeUntil(this._stop$)
      );

    this.courtLoading$ = this._courtEntityService.loading$.pipe(
      delay(0),
      tap(
        () => {

          setTimeout(() => {

            if (this.mapElementRef) {
              this.mapElementRef.nativeElement.innerHTML = '';
            }

            this.map = new Map({
              target: courtMapSelector,
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
              ],
              view: new View({
                center: fromLonLat([this.longitude, this.latitude]),
                zoom: 15,
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
                  scale: 0.7,
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

    this.judgesLoading$ = this._judgeEntityService.loading$;

  }

  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }
}
