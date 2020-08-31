import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  HttpUrlGenerator
} from '@ngrx/data';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { verifyFeatureKey, AppState } from '../../zubr-store.constants';
import { VerificationResponse } from './verification-response.interface';
import { Verification } from './verification.interface';
import { verifyRoutes } from './verify.constants';
import { Verify } from './verify.interface';

/**
 * Service for retrieving verify data
 * @description
 * @export
 * @class VerifyDataService
 * @extends {DefaultDataService<Verify>}
 * @implements {EntityCollectionDataService<Verify>}
 */
@Injectable()
export class VerifyDataService extends DefaultDataService<Verify>
  implements EntityCollectionDataService<Verify> {
  public constructor(
    public config: DefaultDataServiceConfig,
    public http: HttpClient,
    public httpUrlGenerator: HttpUrlGenerator,
    private _store$: Store<AppState>
  ) {
    super(verifyFeatureKey, http, httpUrlGenerator, config);
    this.entityUrl = this.config.root + verifyRoutes.Verify;
  }

  /**
   * Verify query builder and response mapper
   * @description
   * @returns {Observable<Verify>}
   * @memberof VerifyDataService
   */
  public add(entity: Verify): Observable<Verify> {

    return this.http
      .post(this.entityUrl, entity)
      .pipe(

        map((response: HttpResponse<Verify>) => {

          return entity;
        })

      );

  }
  /**
   * Verify query builder and response mapper
   * @description
   * @returns {Observable<Verify>}
   * @memberof VerifyDataService
   */
  public verify(entity: Verification): Observable<VerificationResponse> {

    return this.http
      .post(
        this.config.root + verifyRoutes.Verification, entity)
      .pipe(

        map((response: VerificationResponse) => {

          return response;
        })

      );

  }
}
