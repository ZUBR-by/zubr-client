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
import { organizationFeatureKey, AppState } from '../../zubr-store.constants';
import { OrganizationActions, OrganizationDataActions } from './organization.actions';
import { organizationRoutes } from './organization.constants';
import { Organization } from './organization.interface';

/**
 * Service for retrieving organization data
 * @description
 * @export
 * @class OrganizationDataService
 * @extends {DefaultDataService<Organization>}
 * @implements {EntityCollectionDataService<Organization>}
 */
@Injectable()
export class OrganizationDataService extends DefaultDataService<Organization>
  implements EntityCollectionDataService<Organization> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(organizationFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + organizationRoutes.Organizations;
    this.entityUrl = this.config.root + organizationRoutes.Organization;
  }

  /**
   * Organization query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Organization[]>}
   * @memberof OrganizationDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Organization[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + organizationRoutes.Organizations;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((organizationHttpResponse: EntityHttpResponse<Organization>) => {
          this._store$.dispatch(
            OrganizationActions.SetTotalCountAction({
              payload: organizationHttpResponse['hydra:totalItems'],
            })
          );

          return organizationHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(OrganizationDataActions.QueryManyErrorAction);

          return of([] as Organization[]);

        })

      );

  }

  /**
   * Organization import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof OrganizationDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + organizationRoutes.OrganizationImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
