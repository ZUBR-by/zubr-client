import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { AppState } from '../../zubr-store.constants';
import { ObserverRequestActions } from './observer-request.actions';
import { ObserverRequest } from './observer-request.interface';

/**
 * ObserverRequest service
 * @description
 * @export
 * @class ObserverRequestService
 */
@Injectable()
export class ObserverRequestService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  /**
   * Handles error action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ObserverRequestService
   */
  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      ObserverRequestActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  /**
   * Handles success action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ObserverRequestService
   */
  public handleSuccess(action: EntityAction<ObserverRequest>): Observable<Action> {

    return of(
      ObserverRequestActions.SetEntityErrorAction(null)
    );

  }
}
