import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { decisionFeatureKey } from '../../zubr-store.constants';
import { DecisionDataService } from './decision-data.service';
import { Decision } from './decision.interface';

@Injectable({ providedIn: 'root' })
export class DecisionEntityService extends EntityCollectionServiceBase<Decision> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _decisionDataService: DecisionDataService
  ) {
    super(decisionFeatureKey, serviceElementsFactory);
  }


}
