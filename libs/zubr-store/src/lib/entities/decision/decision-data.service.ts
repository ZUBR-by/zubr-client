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
import { decisionFeatureKey, AppState } from '../../zubr-store.constants';
import { DecisionActions, DecisionDataActions } from './decision.actions';
import { Decision } from './decision.interface';

enum decisionRoutes {
  Decisions = '/decision',
  Decision = '/decision/'
}

@Injectable()
export class DecisionDataService extends DefaultDataService<Decision>
  implements EntityCollectionDataService<Decision> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(decisionFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + decisionRoutes.Decisions;
    this.entityUrl = this.config.root + decisionRoutes.Decision;
  }

  public getWithQuery(qParams: QueryParams | string): Observable<Decision[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + decisionRoutes.Decisions;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((decisionHttpResponse: EntityHttpResponse<Decision>) => {
          this._store$.dispatch(
            DecisionActions.SetTotalCountAction({
              payload: decisionHttpResponse['hydra:totalItems'],
            })
          );

          return decisionHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(DecisionDataActions.QueryManyErrorAction);

          return of([] as Decision[]);

        })

      );

  }
}
