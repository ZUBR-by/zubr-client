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
import { candidateFeatureKey, AppState } from '../../zubr-store.constants';
import { CandidateActions, CandidateDataActions } from './candidate.actions';
import { candidateRoutes } from './candidate.constants';
import { Candidate } from './candidate.interface';

/**
 * Service for retrieving candidate data
 * @description
 * @export
 * @class CandidateDataService
 * @extends {DefaultDataService<Candidate>}
 * @implements {EntityCollectionDataService<Candidate>}
 */
@Injectable()
export class CandidateDataService extends DefaultDataService<Candidate>
  implements EntityCollectionDataService<Candidate> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(candidateFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + candidateRoutes.Candidates;
    this.entityUrl = this.config.root + candidateRoutes.Candidate;
  }

  /**
   * Candidate query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Candidate[]>}
   * @memberof CandidateDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Candidate[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + candidateRoutes.Candidates;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((candidateHttpResponse: EntityHttpResponse<Candidate>) => {
          this._store$.dispatch(
            CandidateActions.SetTotalCountAction({
              payload: candidateHttpResponse['hydra:totalItems'],
            })
          );

          return candidateHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(CandidateDataActions.QueryManyErrorAction);

          return of([] as Candidate[]);

        })

      );

  }

  /**
   * Candidate import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof CandidateDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + candidateRoutes.CandidateImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
