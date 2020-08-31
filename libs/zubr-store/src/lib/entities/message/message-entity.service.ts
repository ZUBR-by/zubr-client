import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CsvImportResponse } from '@zubr-client/zubr-interfaces';
import { Observable } from 'rxjs';
import { messageFeatureKey } from '../../zubr-store.constants';
import { MessageDataService } from './message-data.service';
import { Message } from './message.interface';

/**
 * Message entity service
 * @description
 * @export
 * @class MessageEntityService
 * @extends {EntityCollectionServiceBase<Message>}
 */
@Injectable({ providedIn: 'root' })
export class MessageEntityService extends EntityCollectionServiceBase<Message> {

  public constructor(
    public serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private _messageDataService: MessageDataService
  ) {
    super(messageFeatureKey, serviceElementsFactory);
  }

  /**
   * Csv handler pass-through
   */
  public getByKey(key: string): Observable<Message> {
    return this._messageDataService.getByKey(key);
  }

  /**
   * Csv handler pass-through
   * @description
   * @param {File} csvFile
   * @returns {Observable<CsvImportResponse>}
   * @memberof MessageEntityService
   */
  public importFromCSV(csvFile: File): Observable<CsvImportResponse> {
    return this._messageDataService.importFromCSV(csvFile);
  }

}
