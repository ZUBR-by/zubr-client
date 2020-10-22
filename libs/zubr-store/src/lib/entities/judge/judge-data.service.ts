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
import { judgeFeatureKey, AppState } from '../../zubr-store.constants';
import { JudgeActions, JudgeDataActions } from './judge.actions';
import { Judge } from './judge.interface';

enum judgeRoutes {
  Judges = '/judge',
  Judge = '/judge/'
}

@Injectable()
export class JudgeDataService extends DefaultDataService<Judge>
  implements EntityCollectionDataService<Judge> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(judgeFeatureKey, http, httpUrlGenerator, config);
    this.entitiesUrl = this.config.root + judgeRoutes.Judges;
    this.entityUrl = this.config.root + judgeRoutes.Judge;
  }

  public getWithQuery(qParams: QueryParams | string): Observable<Judge[]> {
    const customEncoder: CustomHttpUrlEncodingCodec = new CustomHttpUrlEncodingCodec();
    /** @type {?} */
    const params: HttpParams = new HttpParams(
      typeof qParams === 'string'
        ? { fromString: qParams, encoder: customEncoder }
        : { fromObject: qParams, encoder: customEncoder });
    /** @type {?} */

    const url: string = this.config.root + judgeRoutes.Judges;

    return this.http
      .get(url, {
        params,
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        map((judgeHttpResponse: EntityHttpResponse<Judge>) => {
          this._store$.dispatch(
            JudgeActions.SetTotalCountAction({
              payload: judgeHttpResponse['hydra:totalItems'],
            })
          );

          return judgeHttpResponse['hydra:member'];
        }),

        catchError(() => {

          this._store$.dispatch(JudgeDataActions.QueryManyErrorAction);

          return of([] as Judge[]);

        })

      );

  }
}
