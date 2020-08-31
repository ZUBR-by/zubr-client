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
import { messageFeatureKey, AppState } from '../../zubr-store.constants';
import { MessageActions, MessageDataActions } from './message.actions';
import { messageRoutes } from './message.constants';
import { Message } from './message.interface';

/**
 * Service for retrieving message data
 * @description
 * @export
 * @class MessageDataService
 * @extends {DefaultDataService<Message>}
 * @implements {EntityCollectionDataService<Message>}
 */
@Injectable()
export class MessageDataService extends DefaultDataService<Message>
  implements EntityCollectionDataService<Message> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(messageFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + messageRoutes.Messages;
    this.entityUrl = this.config.root + messageRoutes.Message;
  }

  /**
   * Message query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Message[]>}
   * @memberof MessageDataService
   */
  public getWithQuery(qParams: QueryParams | string): Observable<Message[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + messageRoutes.Messages;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((messageHttpResponse: EntityHttpResponse<Message>) => {
          this._store$.dispatch(
            MessageActions.SetTotalCountAction({
              payload: messageHttpResponse['hydra:totalItems'],
            })
          );

          return messageHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(MessageDataActions.QueryManyErrorAction);

          return of([] as Message[]);

        })

      );

  }

  /**
   * Message query builder and response mapper
   * @description
   * @param {(QueryParams | string)} qParams
   * @returns {Observable<Message[]>}
   * @memberof MessageDataService
   */
  public getByKey(key: string): Observable<Message> {

    const url: string = this.config.root + messageRoutes.GetMessage + key;

    return this.http
      .get(url, {
        observe: 'response',
      })
      .pipe(
        map(response => response.body),
        catchError(() => {
          return of(null);

        })

      );

  }

  /**
   * Message import csv upload
   * @description
   * @param {File} csvFile
   * @returns {Observable<Action>}
   * @memberof MessageDataService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    const formData: FormData = new FormData();
    formData.append(
      'file',
      new Blob([csvFile], { type: 'text/csv' }),
      csvFile.name
    );

    const url: string = this.config.root + messageRoutes.MessageImport;

    return this.http.post<CsvImportResponse>(url, formData);
  }
}
