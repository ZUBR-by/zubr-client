import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { memberFeatureKey } from '../../zubr-store.constants';
import { MemberDataService } from './member-data.service';
import { Member } from './member.interface';

/**
 * Member entity service
 * @description
 * @export
 * @class MemberEntityService
 * @extends {EntityCollectionServiceBase<Member>}
 */
@Injectable({ providedIn: 'root' })
export class MemberEntityService extends EntityCollectionServiceBase<Member> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _memberDataService: MemberDataService
  ) {
    super(memberFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof MemberEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._memberDataService.importFromCSV(csvFile);
  }

}
