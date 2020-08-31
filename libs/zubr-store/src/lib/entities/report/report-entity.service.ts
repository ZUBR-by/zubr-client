import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { reportFeatureKey } from '../../zubr-store.constants';
import { ReportDataService } from './report-data.service';
import { Report } from './report.interface';

/**
 * Report entity service
 * @description
 * @export
 * @class ReportEntityService
 * @extends {EntityCollectionServiceBase<Report>}
 */
@Injectable({ providedIn: 'root' })
export class ReportEntityService extends EntityCollectionServiceBase<Report> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _reportDataService: ReportDataService
  ) {
    super(reportFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof ReportEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._reportDataService.importFromCSV(csvFile);
  }

}
