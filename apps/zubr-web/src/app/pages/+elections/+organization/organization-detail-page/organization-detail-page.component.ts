import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  selectIsBookmarkExists, AppState, Member,
  MemberEntityService, Organization, OrganizationEntityService, PageService
} from '@zubr-client/zubr-store';
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
import { delay, filter, mergeMap, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';

export const organizationMapSelector: string = 'organizationMap';

/**
 * Station details view component
 * @description
 * @export
 * @class StationDetailPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-organization-page',
  templateUrl: './organization-detail-page.component.html',
})
export class OrganizationDetailPageComponent implements OnInit, OnDestroy {
  /**
   * map element
   * @description
   */
  @ViewChild(organizationMapSelector, { static: false })
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
  public entity$: Observable<Organization>;
  /**
   * Member entity
   * @description
   */
  public members$: Observable<Member[]>;
  /**
   * Employee entity
   * @description
   */
  public employees$: Observable<Member[]>;
  /**
   * Component readiness status
   * @description
   */
  public organizationLoading$: Observable<boolean>;
  /**
   * Component readiness status
   * @description
   */
  public membersLoading$: Observable<boolean>;
  /**
   * Component readiness status
   * @description
   */
  public employeesLoading$: Observable<boolean>;
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
    private _organizationEntityService: OrganizationEntityService,
    private _memberEntityService: MemberEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>,
    private _router: Router
  ) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   */
  public ngOnInit(): void {

    this._organizationEntityService.clearCache();
    this._memberEntityService.clearCache();

    // Initialize page tab instance base on a single data entity

    this.entity$ = this._pageService
      .entityPageTabInstance<Organization>(
        this._activatedRoute,
        this._organizationEntityService,
        ['name']
      )
      .pipe(
        tap((entity: Organization) => {

          if (entity) {

            this.viewError = false;
            this.latitude = entity.latitude;
            this.longitude = entity.longitude;

          } else {

            this.viewError = true;

          }

          return entity;

        }),
        mergeMap((entity: Organization, index: number) => {

          if (entity) {
            this.members$ = this._memberEntityService.getWithQuery({
              'referral.id': entity.id.toString(),
            }).pipe(
              takeUntil(this._stop$)
            );
            this.employees$ = this._memberEntityService.getWithQuery({
              'employer.id': entity.id.toString(),
            }).pipe(
              takeUntil(this._stop$)
            );
          }

          return of(entity);
        }),
        takeUntil(this._stop$)
      );

    // Organization loading state

    this.organizationLoading$ = this._organizationEntityService.loading$.pipe(
      delay(0),
      takeUntil(this._stop$),
      tap(
        () => {

          setTimeout(() => {

            if (this.mapElementRef) {
              this.mapElementRef.nativeElement.innerHTML = '';
            }

            this.map = new Map({
              target: organizationMapSelector,
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

            },       500
          );
        }
      )
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
}
