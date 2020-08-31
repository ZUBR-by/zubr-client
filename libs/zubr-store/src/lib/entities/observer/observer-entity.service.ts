import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { observerFeatureKey } from '../../zubr-store.constants';
import { ObserverDataService } from './observer-data.service';
import { Observer } from './observer.interface';

/**
 * Observer entity service
 * @description
 * @export
 * @class ObserverEntityService
 * @extends {EntityCollectionServiceBase<Observer>}
 */
@Injectable({ providedIn: 'root' })
export class ObserverEntityService extends EntityCollectionServiceBase<Observer> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _observerDataService: ObserverDataService
  ) {
    super(observerFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof ObserverEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._observerDataService.importFromCSV(csvFile);
  }

}
