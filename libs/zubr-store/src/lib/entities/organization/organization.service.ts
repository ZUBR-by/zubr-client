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
import { OrganizationActions } from './organization.actions';
import { Organization } from './organization.interface';

/**
 * Organization service
 * @description
 * @export
 * @class OrganizationService
 */
@Injectable()
export class OrganizationService {

  public constructor(
    private _store$: Store<AppState>
  ) { }

  /**
   * Handles error action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof OrganizationService
   */
  public handleError(action: EntityAction<EntityActionDataServiceError>): Observable<Action> {

    const dataServiceError: DataServiceError = action.payload.data.error;
    const httpErrorResponse: HttpErrorResponse = dataServiceError.error;
    const errorResponse: BadRequest = httpErrorResponse.error;

    return of(
      OrganizationActions.SetEntityErrorAction({
        payload: errorResponse,
      })
    );

  }

  /**
   * Handles success action
   * @description
   * @param {EntityAction} action
   * @returns {Observable<Action>}
   * @memberof OrganizationService
   */
  public handleSuccess(action: EntityAction<Organization>): Observable<Action> {

    return of(
      OrganizationActions.SetEntityErrorAction(null)
    );

  }

  /**
   * Handles successful deletion action
   * @description
   * @returns {Observable<Action>}
   * @memberof OrganizationService
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
