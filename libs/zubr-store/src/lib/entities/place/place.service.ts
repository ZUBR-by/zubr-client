import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { AppState } from '../../zubr-store.constants';
import { PlaceActions } from './place.actions';
import { Place } from './place.interface';

/**
 * Place service
 * @description
 * @export
 * @class PlaceService
 */
@Injectable()
export class PlaceService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  /**
   * Handles error action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof PlaceService
   */
  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      PlaceActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  /**
   * Handles success action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof PlaceService
   */
  public handleSuccess(action: EntityAction<Place>): Observable<Action> {

    return of(
      PlaceActions.SetEntityErrorAction(null)
    );

  }
}
