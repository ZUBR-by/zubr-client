import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { candidateFeatureKey } from '../../zubr-store.constants';
import { CandidateDataService } from './candidate-data.service';
import { Candidate } from './candidate.interface';

/**
 * Candidate entity service
 * @description
 * @export
 * @class CandidateEntityService
 * @extends {EntityCollectionServiceBase<Candidate>}
 */
@Injectable({ providedIn: 'root' })
export class CandidateEntityService extends EntityCollectionServiceBase<Candidate> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _candidateDataService: CandidateDataService
  ) {
    super(candidateFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof CandidateEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._candidateDataService.importFromCSV(csvFile);
  }

}
