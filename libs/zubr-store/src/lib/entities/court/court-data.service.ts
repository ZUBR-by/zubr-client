import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator
} from '@ngrx/data';

import { QueryParams } from '@ngrx/data/src/dataservices/interfaces';
import { Store } from '@ngrx/store';
import { EntityHttpResponse } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomHttpUrlEncodingCodec } from '../../helpers';
import { courtFeatureKey, AppState } from '../../zubr-store.constants';
import { CourtActions, CourtDataActions } from './court.actions';
import { Court } from './court.interface';

enum courtRoutes {
  Courts = '/court',
  Court = '/court/'
}

@Injectable()
export class CourtDataService extends DefaultDataService<Court>
  implements EntityCollectionDataService<Court> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(courtFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + courtRoutes.Courts;
    this.entityUrl = this.config.root + courtRoutes.Court;
  }

  public getWithQuery(qParams: QueryParams | string): Observable<Court[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + courtRoutes.Courts;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((courtHttpResponse: EntityHttpResponse<Court>) => {
          this._store$.dispatch(
            CourtActions.SetTotalCountAction({
              payload: courtHttpResponse['hydra:totalItems'],
            })
          );

          return courtHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(CourtDataActions.QueryManyErrorAction);

          return of([] as Court[]);

        })

      );

  }
}
