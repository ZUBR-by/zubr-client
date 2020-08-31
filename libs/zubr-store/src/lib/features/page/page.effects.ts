import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { pageFeatureKey } from '../../zubr-store.constants';
import { ZubrStore } from '../../zubr-store.interface';
import { PageState } from './page-state.interface';
import { PageTab } from './page-tab.interface';
import { pageActions } from './page.actions';

/**
 * Page effects
 * @description
 * @export
 * @class PageEffects
 */
@Injectable()
export class PageEffects {

  /**
   * Change page tab effect
   * @description
   * @type {Observable<Action>}
   * @memberof PageEffects
   */
  public ChangePageTab$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(pageActions.ChangePageTabAction.type),
    withLatestFrom(this._store$),
    concatMap(() => {
      return of(pageActions.PageTabChangedAction());
    })

  ));

  /**
   * Close page tab effect
   * @description
   * @type {Observable<Action>}
   * @memberof PageEffects
   */
  public ClosePageTab$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<Action>(pageActions.ClosePageTabAction.type),
    withLatestFrom(this._store$),
    concatMap(([action, storeState]) => {
      return this._router.navigate([
        storeState[pageFeatureKey].activePageTab.url,
      ]);
    }),
    concatMap(
      () => of(pageActions.PageTabChangedAction())
    )

  ));

  /**
   * Page tab change request effect
   * @description
   * @type {Observable<Action>}
   * @memberof PageEffects
   */
  public RequestPageTabChange$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<Action>(pageActions.ChangePageTabRequestAction.type),
    withLatestFrom(this._store$),
    concatMap(([action, storeState]) => {

      const pageTab: PageTab = action['payload'];
      const isPageTabExists: PageTab = storeState[pageFeatureKey].pageTabs.find(
        existingPageTab => existingPageTab.url === pageTab.url
      );

      if (storeState[pageFeatureKey].pageTabs.length
        >= this._zubrStoreConfig.maxPageTabsOpened && !isPageTabExists) {
        return of(
          pageActions.PageTabsLimitExceededAction()
        );
      }

      return of(pageActions.ChangePageTabAction({
        payload: pageTab,
      }));
    })

  ));

  /**
   * Page tab limit exceeded effect
   * @description
   * @type {Observable<Action>}
   * @memberof PageEffects
   */
  public PageTabsLimitExceededAction$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<Action>(pageActions.PageTabsLimitExceededAction.type),
    tap(action => {

        this._snackBar.open('Limit der Tabs überschreiten');
      }
    )

  ));

  public constructor(
    private _actions$: Actions,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _store$: Store<PageState>,
    private _zubrStoreConfig: ZubrStore
  ) {}
}
