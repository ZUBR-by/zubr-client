import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  AppState,
  Judge,
  JudgeEntityService,
  Decision,
  DecisionEntityService,
  PageService, selectTotalCountOfDecisions
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
import { delay, filter, mergeMap, startWith, takeUntil, tap } from 'rxjs/operators';
import {FormControl} from "@angular/forms";

export const judgeMapSelector: string = 'judgeMap';

@Component({
  selector: 'zubr-client-judge-page',
  templateUrl: './judge-detail-page.component.html',
})
export class JudgeDetailPageComponent implements OnInit, OnDestroy {
  @ViewChild(judgeMapSelector, { static: false })
  public set mapElement(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.mapElementRef = content;
    }
  }

  public viewError: boolean = false;

  public entity$: Observable<Judge>;

  public judges$: Observable<Judge[]>;
  /**
   * Component readiness status
   * @description
   */
  public judgeLoading$: Observable<boolean>;

  public judgesLoading$: Observable<boolean>;

  public map: Map;

  public latitude: number = 53.7098;

  public longitude: number = 27.9534;

  public _stop$: Subject<void> = new Subject();

  public dataGridOptions: DataGridOptions<Decision> = {
    dataSource: new EntityDataSource(this._decisionEntityService),
    columns: [
      {
        label: 'fullName',
        displayName: 'fullName',
        visibleOnMobile: true
      },
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
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(undefined), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'judge.id',
    emptyMessageTitle: 'no_messages_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfDecisions),
  };

  private mapElementRef: ElementRef;

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _judgeEntityService: JudgeEntityService,
    private _decisionEntityService: DecisionEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {

    this._judgeEntityService.clearCache();
    this._judgeEntityService.clearCache();

    // Initialize page tab instance base on a single data entity

    this.entity$ = this._pageService
      .entityPageTabInstance<Judge>(
        this._activatedRoute,
        this._judgeEntityService,
        ['description']
      )
      .pipe(
        tap((entity: Judge) => {

          this.viewError = !entity;

          return entity;

        }),
        mergeMap((entity: Judge, index: number) => {
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

    this.judgeLoading$ = this._judgeEntityService.loading$.pipe(
      delay(0),
      tap(
        () => {

          setTimeout(() => {

            if (this.mapElementRef) {
              this.mapElementRef.nativeElement.innerHTML = '';
            }

            this.map = new Map({
              target: judgeMapSelector,
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
