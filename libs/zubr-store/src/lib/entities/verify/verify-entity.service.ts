import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { verifyFeatureKey } from '../../zubr-store.constants';
import { VerificationResponse } from './verification-response.interface';
import { Verification } from './verification.interface';
import { VerifyDataService } from './verify-data.service';
import { Verify } from './verify.interface';

/**
 * Verify entity service
 * @description
 * @export
 * @class VerifyEntityService
 * @extends {EntityCollectionServiceBase<Verify>}
 */
@Injectable({ providedIn: 'root' })
export class VerifyEntityService extends EntityCollectionServiceBase<Verify> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _verifyDataService: VerifyDataService
  ) {
    super(verifyFeatureKey, serviceElementsFactory);
  }

  /**
   * Verify form
   */
  public verify(entity: Verification): Observable<VerificationResponse> {
    return this._verifyDataService.verify(entity);
  }

}
