import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { AppState } from '../../zubr-store.constants';
import { CourtActions } from './court.actions';
import { Court } from './court.interface';

@Injectable()
export class CourtService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      CourtActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  public handleSuccess(action: EntityAction<Court>): Observable<Action> {

    return of(
      CourtActions.SetEntityErrorAction(null)
    );

  }

}
