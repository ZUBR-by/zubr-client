import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { commissionFeatureKey } from '../../zubr-store.constants';
import { CommissionDataService } from './commission-data.service';
import { Commission } from './commission.interface';

/**
 * Commission entity service
 * @description
 * @export
 * @class CommissionEntityService
 * @extends {EntityCollectionServiceBase<Commission>}
 */
@Injectable({ providedIn: 'root' })
export class CommissionEntityService extends EntityCollectionServiceBase<Commission> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _commissionDataService: CommissionDataService
  ) {
    super(commissionFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof CommissionEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._commissionDataService.importFromCSV(csvFile);
  }

}
