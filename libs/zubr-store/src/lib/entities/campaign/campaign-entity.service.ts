import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { campaignFeatureKey } from '../../zubr-store.constants';
import { CampaignDataService } from './campaign-data.service';
import { Campaign } from './campaign.interface';

/**
 * Campaign entity service
 * @description
 * @export
 * @class CampaignEntityService
 * @extends {EntityCollectionServiceBase<Campaign>}
 */
@Injectable({ providedIn: 'root' })
export class CampaignEntityService extends EntityCollectionServiceBase<Campaign> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _campaignDataService: CampaignDataService
  ) {
    super(campaignFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof CampaignEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._campaignDataService.importFromCSV(csvFile);
  }

}
