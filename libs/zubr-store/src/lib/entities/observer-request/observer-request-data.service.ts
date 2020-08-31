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
import { observerRequestFeatureKey, AppState } from '../../zubr-store.constants';
import { ObserverRequestActions, ObserverRequestDataActions } from './observer-request.actions';
import { observerRequestRoutes } from './observer-request.constants';
import { ObserverRequest } from './observer-request.interface';

/**
 * Service for retrieving observerRequest data
 * @description
 * @export
 * @class ObserverRequestDataService
 * @extends {DefaultDataService<ObserverRequest>}
 * @implements {EntityCollectionDataService<ObserverRequest>}
 */
@Injectable()
export class ObserverRequestDataService extends DefaultDataService<ObserverRequest>
  implements EntityCollectionDataService<ObserverRequest> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(observerRequestFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + observerRequestRoutes.ObserverRequests;
    this.entityUrl = this.config.root + observerRequestRoutes.ObserverRequest;
  }

  /**
   * ObserverRequest query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<ObserverRequest[]>}
   * @memberof ObserverRequestDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<ObserverRequest[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + observerRequestRoutes.ObserverRequests;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((observerRequestHttpResponse: EntityHttpResponse<ObserverRequest>) => {
          this._store$.dispatch(
            ObserverRequestActions.SetTotalCountAction({
              payload: observerRequestHttpResponse['hydra:totalItems'],
            })
          );

          return observerRequestHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(ObserverRequestDataActions.QueryManyErrorAction);

          return of([] as ObserverRequest[]);

        })

      );

  }

  /**
   * ObserverRequest import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof ObserverRequestDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + observerRequestRoutes.ObserverRequestImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
