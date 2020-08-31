import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import {
  Commission,
  CommissionEntityService,
  Place,
  PlaceEntityService
} from '@zubr-client/zubr-store';
import { EntityDataSource } from '@zubr-client/zubr-ui-elements';
import Coordinate from 'ol/coordinate';
import { containsCoordinate, Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { defaults as defaultInteractions } from 'ol/interaction';
import DragPan from 'ol/interaction/DragPan';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat, transform } from 'ol/proj';
import { Cluster, OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Icon, Style, Text } from 'ol/style';
import View from 'ol/View';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil } from 'rxjs/operators';
import { MapCommissionListComponent } from '../../lists/map-commission-list/map-commission-list.component';

/**
 * Commission Map Component
 * @description
 * @export
 * @class CommissionMapComponent
 */
@Component({
  selector: 'zubr-client-commission-map',
  templateUrl: './commission-map.component.html',
})
export class CommissionMapComponent implements OnInit, AfterViewInit {

  /**
   * Component readiness status
   * @description
   * @type {Observable<boolean>}
   */
  public loading$: Observable<boolean>;
  /**
   * Map loading
   * @description
   * @type {boolean}
   */
  public loadingMap: boolean = true;
  /**
   * search control
   * @description
   */
  public searchControl: AbstractControl = new FormControl();
  /**
   * filter control
   * @description
   */
  public filterControl: AbstractControl = new FormControl('gte');
  /**
   * default latitude
   * @description
   */
  public latitude: number = 53.7098;
  /**
   * default longitude
   * @description
   */
  public longitude: number = 27.9534;
  /**
   * map
   * @description
   */
  public map: Map;
  /**
   * map features / markers
   * @description
   */
  public features: any[] = [];
  /**
   * commissions
   * @description
   */
  public commissions: Commission[] = [];
  /**
   * selectedCommissions
   * @description
   */
  public selectedCommissions: Commission[] = [];
  /**
   * seconds
   * @description
   */
  public seconds: number = 0;
  /**
   * selectedCommissionIds
   * @description
   */
  public selectedCommissionIds: number[] = [];
  /**
   * Places data source
   * @description
   * @type {EntityDataSource}
   * @memberof PatientFormComponent
   */
  public placeDataSource: EntityDataSource<Place> = new EntityDataSource<Place>(
    this._placeEntityService
  );

  /**
   * Subscription termination property
   * @description
   * @private
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _commissionEntityService: CommissionEntityService,
    private _placeEntityService: PlaceEntityService,
    private _bottomSheet: MatBottomSheet,
    private _router: Router
  ) {}

  /**
   * ngOnInit
   * @description
   */
  public ngOnInit() {

    const startDate: Date = new Date();

    // @todo move start date of elections into the config
    const endDate: Date = new Date('2020-08-04');

    this.seconds = Math.round((endDate.getTime() - startDate.getTime()) / 1000);

    setInterval(() => { this.seconds--; }, 1000);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 7,
        enableRotation: false,
      }),
      interactions: defaultInteractions({
        dragPan: false,
        mouseWheelZoom: false,
        doubleClickZoom: false,
      }).extend([
        new DragPan({kinetic: false}),
        new MouseWheelZoom({duration: 0}),

      ]),

    });

    this.map.on('movestart', e => {

      e.preventDefault();
      this.eraseCommissionDetails();

    });

    this.map.on('moveend', e => {

      e.preventDefault();
      this.eraseCommissionDetails();
      this.updateMarkersOnChange();

    });

    this.map.on('click', e => {

      e.preventDefault();
      this.eraseCommissionDetails();

      this.map.forEachFeatureAtPixel(e.pixel, baseFeature => {

        if (baseFeature.getProperties().features.length > 0) {

          baseFeature.getProperties().features.forEach(

            (feature: Feature) => {

              this.selectedCommissionIds.push(feature.getProperties().id);

            }

          );

          if (this.selectedCommissionIds.length === 1) {
            this._router.navigate([
              `/elections/commission/${this.selectedCommissionIds.find(x => x)}`,
            ]);
          } else if (this.selectedCommissionIds.length > 0) {
            setTimeout(() => {
              this._bottomSheet.open(MapCommissionListComponent, {
                data: {
                  commissionIds: this.selectedCommissionIds,
                  commissions: this.commissions,
                },
              });
            },         100);
          }

        }
      });
    });

    this.searchControl.valueChanges.pipe(

      debounceTime(300),

      concatMap((value: string) => {
        return this._placeEntityService.getWithQuery(value);
      }),

      map((places: Place[]) => {
        if (places.length > 0) {

          const updatedView: View = this.map.getView();

          updatedView.setCenter(fromLonLat([
            places[0].lon, places[0].lat,
          ]));

          updatedView.setZoom(14);

          this.map.setView(
            updatedView
          );

        }
      }),

      takeUntil(this._stop$)

    ).subscribe();

  }

  /**
   * ngOnInit
   * @description
   */
  public loadMap(): void {

    this.features = [];

    if (this.searchControl.value) {
      this.searchControl.reset();
    }

    const queryParams: any =  {
      pagination: 'false',
      map_view: 'true',
      commission_type: '2', // 2 - station
      // extent: this.map.getView().calculateExtent(this.map.getSize()).toString(),
    };

    const filterKey: string = `applied[${this.filterControl.value}]`;
    queryParams[filterKey] = 0;

    this._commissionEntityService.getWithQuery(queryParams)
      .subscribe((commissions: Commission[]) => {

      this.commissions = commissions;
      commissions.forEach((commission: Commission) => {

        const coordinate: Coordinate = transform(
          [ commission.longitude, commission.latitude ], 'EPSG:4326', 'EPSG:3857'
        );

        const feature: Feature = new Feature({
          geometry: new Point(coordinate),
          id: commission.id,
        });

        this.features.push(feature);

      });

      this.updateMarkersOnChange();

    });

    this.map.getView().animate({
      center: fromLonLat([this.longitude, this.latitude]),
      zoom: 7,
      duration: 250,
    });
  }

  /**
   * ngOnInit
   * @description
   */
  public ngAfterViewInit() {

    // Define entity loading state
    // (only for making some spinner or progress bar)

    this.loading$ = this._commissionEntityService.loading$;
    this.loadMap();

  }
  /**
   * ngOnInit
   * @description
   */
  public updateMarkersOnChange(): void {

    this.loadingMap = true;

    this.map.getLayers().forEach(
      layer => {
        if (layer instanceof VectorLayer) {
          this.map.removeLayer(layer);
        }
      }
    );

    const mapExtent: Extent = this.map.getView().calculateExtent(this.map.getSize());

    const intersectedFeatures: Feature[] = [];

    this.features.forEach((feature: Feature) => {
      const featureCoordinates: Coordinate[] = feature.getGeometry().getCoordinates();
      if (containsCoordinate(mapExtent, featureCoordinates)) {
        intersectedFeatures.push(feature);
      }
    });

    this.setClusters(intersectedFeatures);
    this.loadingMap = false;

  }

  /**
   * ngOnInit
   * @description
   */
  public setClusters(features: any): void {

    const source: VectorSource = new VectorSource({
      features,
    });

    const clusterSource: Cluster = new Cluster({
      distance: 40,
      source,
    });

    const styleCache: object = {};

    const clusters: VectorLayer = new VectorLayer({
      source: clusterSource,
      style(feature: Feature) {

        const size: number = feature.get('features').length;
        let style: Style = styleCache[size];

        if (!style) {

          style = new Style({
            image: new Icon({
              src: './assets/images/station_icon.svg',
            }),
          });

          if (size > 1) {
            style = [new Style({
              image: new Circle({
                radius: 20,
                fill: new Fill({
                  color: 'rgb(250,127,37, 0.65)',
                }),
              }),
              text: new Text({
                text: size.toString(),
                font: '14px sans-serif',
                fill: new Fill({
                  color: '#fff',
                }),
              }),
            })];
          }

          styleCache[size] = style;

        }

        return style;
      },
    });

    this.map.addLayer(clusters);

  }

  /**
   * ngOnInit
   * @description
   */
  public eraseCommissionDetails(): void {
    this.selectedCommissions = [];
    this.selectedCommissionIds = [];
  }

}
