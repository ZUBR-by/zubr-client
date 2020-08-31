import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator
} from '@ngrx/data';

import { QueryParams } from '@ngrx/data/src/dataservices/interfaces';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { heartbeatFeatureKey, AppState } from '../../zubr-store.constants';
import { HeartbeatDataActions } from './heartbeat.actions';
import { heartbeatRoutes } from './heartbeat.constants';
import { Heartbeat } from './heartbeat.interface';

/**
 * Service for retrieving heartbeat data
 * @description
 * @export
 * @class HeartbeatDataService
 * @extends {DefaultDataService<Heartbeat>}
 * @implements {EntityCollectionDataService<Heartbeat>}
 */
@Injectable()
export class HeartbeatDataService extends DefaultDataService<Heartbeat>
  implements EntityCollectionDataService<Heartbeat> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(heartbeatFeatureKey, http, httpUrlGenerator, config);
    this.entityUrl = this.config.root + heartbeatRoutes.Heartbeat;
  }

  /**
   * Heartbeat query builder and response mapper
   * @description
   * @returns {Observable<Heartbeat>}
   */
  public getByKey(key: number = 1): Observable<Heartbeat> {

    return this.http
      .get(this.entityUrl, {
        observe: 'response',
      })
      .pipe(

        map(response => response.body),

        catchError(() => {

          this._store$.dispatch(HeartbeatDataActions.QueryOneErrorAction);

          return of(null);

        })

      );

  }
}
