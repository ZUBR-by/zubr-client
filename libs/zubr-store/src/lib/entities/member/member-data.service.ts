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
import { memberFeatureKey, AppState } from '../../zubr-store.constants';
import { MemberActions, MemberDataActions } from './member.actions';
import { memberRoutes } from './member.constants';
import { Member } from './member.interface';

/**
 * Service for retrieving member data
 * @description
 * @export
 * @class MemberDataService
 * @extends {DefaultDataService<Member>}
 * @implements {EntityCollectionDataService<Member>}
 */
@Injectable()
export class MemberDataService extends DefaultDataService<Member>
  implements EntityCollectionDataService<Member> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(memberFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + memberRoutes.Members;
    this.entityUrl = this.config.root + memberRoutes.Member;
  }

  /**
   * Member query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Member[]>}
   * @memberof MemberDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Member[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + memberRoutes.Members;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((memberHttpResponse: EntityHttpResponse<Member>) => {
          this._store$.dispatch(
            MemberActions.SetTotalCountAction({
              payload: memberHttpResponse['hydra:totalItems'],
            })
          );

          return memberHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(MemberDataActions.QueryManyErrorAction);

          return of([] as Member[]);

        })

      );

  }

  /**
   * Member import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof MemberDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + memberRoutes.MemberImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
