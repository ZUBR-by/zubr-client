import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Data,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { ReducerManagerDispatcher, Store } from '@ngrx/store';
import {
  pageActions, AppState,
  PageTab
} from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Page accessibility service
 * @description
 * @export
 * @class PageGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class PageGuardService implements CanActivate {
  public constructor(
    private _dispatcher: ReducerManagerDispatcher,
    private _store$: Store<AppState>
  ) {}

  /**
   * Checks for eligibility to enter route
   * @description
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {(Observable<boolean | UrlTree>
   *     | Promise<boolean | UrlTree>
   *     | boolean
   *     | UrlTree)}
   * @memberof PageGuardService
   */
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeMetadata: Data = route.data;
    const pageTab: PageTab = {
      url: state.url,
      metadata: routeMetadata,
    };
    if (routeMetadata.navigateToPageTab) {
      this._store$.dispatch(pageActions.ChangePageTabAction({
        payload: pageTab,
      }));

      return this._dispatcher.pipe(

        map(action => {
          return !(action.type === pageActions.PageTabsLimitExceededAction.type);
        })

      );
    }

    return false;
  }
}
