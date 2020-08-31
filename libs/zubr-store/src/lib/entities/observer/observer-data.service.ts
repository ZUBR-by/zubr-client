import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator
} from '@ngrx/data';

import { QueryParams } from '@ngrx/data/src/dataservices/interfaces';
import { Action, Store } from '@ngrx/store';
import { CsvImportResponse, EntityHttpResponse } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomHttpUrlEncodingCodec } from '../../helpers';
import { observerFeatureKey, AppState } from '../../zubr-store.constants';
import { ObserverActions, ObserverDataActions } from './observer.actions';
import { observerRoutes } from './observer.constants';
import { Observer } from './observer.interface';

/**
 * Service for retrieving observer data
 * @description
 * @export
 * @class ObserverDataService
 * @extends {DefaultDataService<Observer>}
 * @implements {EntityCollectionDataService<Observer>}
 */
@Injectable()
export class ObserverDataService extends DefaultDataService<Observer>
  implements EntityCollectionDataService<Observer> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(observerFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + observerRoutes.Observers;
    this.entityUrl = this.config.root + observerRoutes.Observer;
  }

  /**
   * Observer query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Observer[]>}
   * @memberof ObserverDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Observer[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + observerRoutes.Observers;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((observerHttpResponse: EntityHttpResponse<Observer>) => {
          this._store$.dispatch(
            ObserverActions.SetTotalCountAction({
              payload: observerHttpResponse['hydra:totalItems'],
            })
          );

          return observerHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(ObserverDataActions.QueryManyErrorAction);

          return of([] as Observer[]);

        })

      );

  }

  /**
   * Observer import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof ObserverDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + observerRoutes.ObserverImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
