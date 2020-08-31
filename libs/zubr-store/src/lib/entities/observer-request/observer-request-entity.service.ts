import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { observerRequestFeatureKey } from '../../zubr-store.constants';
import { ObserverRequestDataService } from './observer-request-data.service';
import { ObserverRequest } from './observer-request.interface';

/**
 * ObserverRequest entity service
 * @description
 * @export
 * @class ObserverRequestEntityService
 * @extends {EntityCollectionServiceBase<ObserverRequest>}
 */
@Injectable({ providedIn: 'root' })
export class ObserverRequestEntityService extends EntityCollectionServiceBase<ObserverRequest> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _observerRequestDataService: ObserverRequestDataService
  ) {
    super(observerRequestFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof ObserverRequestEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._observerRequestDataService.importFromCSV(csvFile);
  }

}
