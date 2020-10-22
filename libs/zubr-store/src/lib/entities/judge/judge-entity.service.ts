import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { judgeFeatureKey } from '../../zubr-store.constants';
import { JudgeDataService } from './judge-data.service';
import { Judge } from './judge.interface';

@Injectable({ providedIn: 'root' })
export class JudgeEntityService extends EntityCollectionServiceBase<Judge> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _judgeDataService: JudgeDataService
  ) {
    super(judgeFeatureKey, serviceElementsFactory);
  }


}
