import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { organizationFeatureKey } from '../../zubr-store.constants';
import { OrganizationDataService } from './organization-data.service';
import { Organization } from './organization.interface';

/**
 * Organization entity service
 * @description
 * @export
 * @class OrganizationEntityService
 * @extends {EntityCollectionServiceBase<Organization>}
 */
@Injectable({ providedIn: 'root' })
export class OrganizationEntityService extends EntityCollectionServiceBase<Organization> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _organizationDataService: OrganizationDataService
  ) {
    super(organizationFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof OrganizationEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._organizationDataService.importFromCSV(csvFile);
  }

}
