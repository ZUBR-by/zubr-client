import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { heartbeatFeatureKey } from '../../zubr-store.constants';
import { HeartbeatDataService } from './heartbeat-data.service';
import { Heartbeat } from './heartbeat.interface';

/**
 * Heartbeat entity service
 * @description
 * @export
 * @class HeartbeatEntityService
 * @extends {EntityCollectionServiceBase<Heartbeat>}
 */
@Injectable({ providedIn: 'root' })
export class HeartbeatEntityService extends EntityCollectionServiceBase<Heartbeat> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _heartbeatDataService: HeartbeatDataService
  ) {
    super(heartbeatFeatureKey, serviceElementsFactory);
  }
  /**
   * Get by key
   * @description
   */
  public getByKey(key: number): Observable<Heartbeat> {
    return this._heartbeatDataService.getByKey(key);
  }

}
