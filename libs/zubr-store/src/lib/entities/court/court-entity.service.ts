import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { courtFeatureKey } from '../../zubr-store.constants';
import { CourtDataService } from './court-data.service';
import { Court } from './court.interface';

@Injectable({ providedIn: 'root' })
export class CourtEntityService extends EntityCollectionServiceBase<Court> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _courtDataService: CourtDataService
  ) {
    super(courtFeatureKey, serviceElementsFactory);
  }

}
