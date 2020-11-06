import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Member,
  MemberEntityService, PageService
} from '@zubr-client/zubr-store';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat, transform } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import View from 'ol/View';
import { of, Observable, Subject } from 'rxjs';
import { delay, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

export const memberMapSelector: string = 'memberMap';

/**
 * Member details view component
 * @description
 * @export
 * @class MemberDetailPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-member-page',
  templateUrl: './member-detail-page.component.html',
})
export class MemberDetailPageComponent implements OnInit, OnDestroy {
  /**
   * Member entity
   * @description
   * @type {Member}
   * @memberof MemberDetailPageComponent
   */
  public entity$: Observable<Member>;
  /**
   * Member entity
   * @description
   */
  public members$: Observable<Member[]>;
  /**
   * Component readiness status
   * @description
   */
  public entityLoading$: Observable<boolean>;
  /**
   * Component readiness status
   * @description
   */
  public membersLoading$: Observable<boolean>;
  /**
   * error
   * @description
   */
  public viewError: boolean = false;
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
   * map element ref
   * @description
   */
  private mapElementRef: ElementRef;
  /**
   * map element
   * @description
   */
  @ViewChild(memberMapSelector, { static: false })
  public set mapElement(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.mapElementRef = content;
    }
  }
  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _pageService: PageService,
    private _memberEntityService: MemberEntityService
  ) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof MemberDetailPageComponent
   */
  public ngOnInit(): void {

    this.entity$ = this._pageService
      .entityPageInstance<Member>(
        this._activatedRoute,
        this._memberEntityService
      )
      .pipe(
        tap((entity: Member) => {

          if (entity) {

            this.viewError = false;
            this.latitude = entity.commission.latitude;
            this.longitude = entity.commission.longitude;

          } else {

            this.viewError = true;

          }

        }),
        mergeMap((entity: Member) => {

          if (entity && entity.commission.id) {
            this.members$ = this._memberEntityService.getWithQuery({
              'commission.id': entity.commission.id.toString(),
              'pagination': 'false',
            }).pipe(
              map(
                (members: Member[]) => {
                  return members.filter((member: Member) => member.id !== entity.id);
                }
              )
            );
          }

          return of(entity);
        }),
        takeUntil(this._stop$)
      );

    // Entity loading state

    this.entityLoading$ = this._memberEntityService.loading$.pipe(
      delay(0),
      takeUntil(this._stop$),
      tap(() => {

        setTimeout(() => {

          if (this.mapElementRef) {

            this.mapElementRef.nativeElement.innerHTML = '';
            this.map = new Map({
              target: memberMapSelector,
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
              ],
              view: new View({
                center: fromLonLat([
                  this.longitude, this.latitude,
                ]),
                zoom: 16,
                enableRotation: false,
              }),
              interactions: [],
              controls: [],

            });
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

            const updatedView: View = this.map.getView();

            this.map.addLayer(marker);
            this.map.setView(
              updatedView
            );
          }
        },         100);
      })
    );

  }

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof MemberDetailPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  /**
   * download memo
   */
  public downloadMemo(): void {
    location.href = '/assets/files/pamyatka.docx';
  }
}
