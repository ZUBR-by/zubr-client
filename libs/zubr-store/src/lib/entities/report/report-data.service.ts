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
import { reportFeatureKey, AppState } from '../../zubr-store.constants';
import { ReportActions, ReportDataActions } from './report.actions';
import { reportRoutes } from './report.constants';
import { Report } from './report.interface';

/**
 * Service for retrieving report data
 * @description
 * @export
 * @class ReportDataService
 * @extends {DefaultDataService<Report>}
 * @implements {EntityCollectionDataService<Report>}
 */
@Injectable()
export class ReportDataService extends DefaultDataService<Report>
  implements EntityCollectionDataService<Report> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(reportFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + reportRoutes.Reports;
    this.entityUrl = this.config.root + reportRoutes.Report;
  }

  /**
   * Report query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Report[]>}
   * @memberof ReportDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Report[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + reportRoutes.Reports;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((reportHttpResponse: EntityHttpResponse<Report>) => {
          this._store$.dispatch(
            ReportActions.SetTotalCountAction({
              payload: reportHttpResponse['hydra:totalItems'],
            })
          );

          return reportHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(ReportDataActions.QueryManyErrorAction);

          return of([] as Report[]);

        })

      );

  }

  /**
   * Report import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof ReportDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + reportRoutes.ReportImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
