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
import { commissionFeatureKey, AppState } from '../../zubr-store.constants';
import { CommissionActions, CommissionDataActions } from './commission.actions';
import { commissionRoutes } from './commission.constants';
import { Commission } from './commission.interface';

/**
 * Service for retrieving commission data
 * @description
 * @export
 * @class CommissionDataService
 * @extends {DefaultDataService<Commission>}
 * @implements {EntityCollectionDataService<Commission>}
 */
@Injectable()
export class CommissionDataService extends DefaultDataService<Commission>
  implements EntityCollectionDataService<Commission> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(commissionFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + commissionRoutes.Commissions;
    this.entityUrl = this.config.root + commissionRoutes.Commission;
  }

  /**
   * Commission query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Commission[]>}
   * @memberof CommissionDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Commission[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + commissionRoutes.Commissions;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((commissionHttpResponse: EntityHttpResponse<Commission>) => {
          this._store$.dispatch(
            CommissionActions.SetTotalCountAction({
              payload: commissionHttpResponse['hydra:totalItems'],
            })
          );

          return commissionHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(CommissionDataActions.QueryManyErrorAction);

          return of([] as Commission[]);

        })

      );

  }

  /**
   * Commission import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof CommissionDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + commissionRoutes.CommissionImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
