import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { AppState } from '../../zubr-store.constants';
import { JudgeActions } from './judge.actions';
import { Judge } from './judge.interface';

@Injectable()
export class JudgeService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      JudgeActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  public handleSuccess(action: EntityAction<Judge>): Observable<Action> {

    return of(
      JudgeActions.SetEntityErrorAction(null)
    );

  }

}
