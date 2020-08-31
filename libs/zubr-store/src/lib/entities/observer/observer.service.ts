import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceError, EntityAction, EntityActionDataServiceError } from '@ngrx/data';
import { Action, Store } from '@ngrx/store';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageTab } from '../../features/page/page-tab.interface';
import { pageActions } from '../../features/page/page.actions';
import { selectActivePageTab } from '../../features/page/page.reducer';
import { AppState } from '../../zubr-store.constants';
import { ObserverActions } from './observer.actions';
import { Observer } from './observer.interface';

/**
 * Observer service
 * @description
 * @export
 * @class ObserverService
 */
@Injectable()
export class ObserverService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  /**
   * Handles error action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ObserverService
   */
  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      ObserverActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  /**
   * Handles success action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof ObserverService
   */
  public handleSuccess(action: EntityAction<Observer>): Observable<Action> {

    return of(
      ObserverActions.SetEntityErrorAction(null)
    );

  }

  /**
   * Handles successful deletion action
   * @description
   * @returns {Observable<Action>}
   * @memberof ObserverService
   */
  public handleSuccessOnDelete(): Observable<Action> {

    return this._store$.select(selectActivePageTab).pipe(
      switchMap(
        (activeTab: PageTab) => {
          if (activeTab) {
            return of(pageActions.ClosePageTabAction({
              payload: activeTab,
            }));
          }
        }
      )
    );

  }

}
