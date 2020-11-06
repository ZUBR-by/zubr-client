import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { AppState } from '../../zubr-store.constants';
import { ReportActions } from './report.actions';
import { Report } from './report.interface';

/**
 * Report service
 * @description
 * @export
 * @class ReportService
 */
@Injectable()
export class ReportService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  /**
   * Handles error action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ReportService
   */
  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      ReportActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  /**
   * Handles success action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ReportService
   */
  public handleSuccess(action: EntityAction<Report>): Observable<Action> {

    return of(
      ReportActions.SetEntityErrorAction(null)
    );

  }

}
