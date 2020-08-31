import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator
} from '@ngrx/data';

import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { placeFeatureKey, AppState } from '../../zubr-store.constants';
import { PlaceActions, PlaceDataActions } from './place.actions';
import { placeRoutes } from './place.constants';
import { Place } from './place.interface';

/**
 * Service for retrieving place data
 * @description
 * @export
 * @class PlaceDataService
 * @extends {DefaultDataService<Place>}
 * @implements {EntityCollectionDataService<Place>}
 */
@Injectable()
export class PlaceDataService extends DefaultDataService<Place>
  implements EntityCollectionDataService<Place> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(placeFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = placeRoutes.GetPlaces;
    this.entityUrl = placeRoutes.GetPlaces;
  }

  /**
   * Place query builder and response mapper
   * @description
   * @param {(string)} query
   * @returns {Observable<Place[]>}
   * @memberof PlaceDataService
   */
  public getWithQuery(query: string): Observable<Place[]> {

    const qParams: any = {
      format: 'json',
      countrycodes: 'by',
    };

    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams }
        : { fromObject: qParams });
    /** @type {?} */

    return this.http
      .get(placeRoutes.GetPlaces + query, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((placeHttpResponse: Place[]) => {
          this._store$.dispatch(
            PlaceActions.SetTotalCountAction({
              payload: placeHttpResponse.length,
            })
          );

          return placeHttpResponse;
        }),

        catchError(() => {

          this._store$.dispatch(PlaceDataActions.QueryManyErrorAction);

          return of([]);

        })

      );

  }
}
