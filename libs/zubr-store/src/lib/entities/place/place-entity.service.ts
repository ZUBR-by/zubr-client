import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { placeFeatureKey } from '../../zubr-store.constants';
import { PlaceDataService } from './place-data.service';
import { Place } from './place.interface';

/**
 * Place entity service
 * @description
 * @export
 * @class PlaceEntityService
 * @extends {EntityCollectionServiceBase<Place>}
 */
@Injectable({ providedIn: 'root' })
export class PlaceEntityService extends EntityCollectionServiceBase<Place> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _placeDataService: PlaceDataService
  ) {
    super(placeFeatureKey, serviceElementsFactory);
  }

}
