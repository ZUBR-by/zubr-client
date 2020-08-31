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
import { campaignFeatureKey, AppState } from '../../zubr-store.constants';
import { CampaignActions, CampaignDataActions } from './campaign.actions';
import { campaignRoutes } from './campaign.constants';
import { Campaign } from './campaign.interface';

/**
 * Service for retrieving campaign data
 * @description
 * @export
 * @class CampaignDataService
 * @extends {DefaultDataService<Campaign>}
 * @implements {EntityCollectionDataService<Campaign>}
 */
@Injectable()
export class CampaignDataService extends DefaultDataService<Campaign>
  implements EntityCollectionDataService<Campaign> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(campaignFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + campaignRoutes.Campaigns;
    this.entityUrl = this.config.root + campaignRoutes.Campaign;
  }

  /**
   * Campaign query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Campaign[]>}
   * @memberof CampaignDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Campaign[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + campaignRoutes.Campaigns;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((campaignHttpResponse: EntityHttpResponse<Campaign>) => {
          this._store$.dispatch(
            CampaignActions.SetTotalCountAction({
              payload: campaignHttpResponse['hydra:totalItems'],
            })
          );

          return campaignHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(CampaignDataActions.QueryManyErrorAction);

          return of([] as Campaign[]);

        })

      );

  }

  /**
   * Campaign import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof CampaignDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + campaignRoutes.CampaignImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
