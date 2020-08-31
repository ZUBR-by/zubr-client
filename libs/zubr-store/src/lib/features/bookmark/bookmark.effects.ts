import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { bookmarkFeatureKey } from '../../zubr-store.constants';
import { ZubrStore } from '../../zubr-store.interface';
import { BookmarkState } from './bookmark-state.interface';
import { bookmarkActions } from './bookmark.actions';

/**
 * Bookmark effects
 * @description
 * @export
 * @class BookmarkEffects
 */
@Injectable()
export class BookmarkEffects {

  /**
   * Change bookmark effect
   * @description
   * @type {Observable<Action>}
   * @memberof BookmarkEffects
   */
  public CreateBookmark$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType(bookmarkActions.CreateBookmarkAction.type),
    withLatestFrom(this._store$),
    concatMap(([action, storeState]) => {

      if (storeState[bookmarkFeatureKey].bookmarks.length >= 5) {
        this._snackBar.open(this._translateService.instant('bookmarks_limit_exceed'));
      } else {
        this._snackBar.open(this._translateService.instant('bookmarks_created'));
      }

      return of(bookmarkActions.CreateBookmarkSuccessAction());

    })

  ));

  /**
   * Remove bookmark effect
   * @description
   * @type {Observable<Action>}
   * @memberof BookmarkEffects
   */
  public RemoveBookmark$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<Action>(bookmarkActions.RemoveBookmarkAction.type),
    withLatestFrom(this._store$),
    concatMap(
      () => {
        this._snackBar.open(this._translateService.instant('bookmarks_removed'));

        return of(bookmarkActions.RemoveBookmarkSuccessAction());
      }
    )

  ));

  /**
   * Bookmarks limit exceeded effect
   * @description
   * @type {Observable<Action>}
   * @memberof BookmarkEffects
   */
  public BookmarksLimitExceededAction$: Observable<Action> = createEffect(() => this._actions$.pipe(
    ofType<Action>(bookmarkActions.BookmarksLimitExceededAction.type),
    switchMap((action: Action) => {
      this._snackBar.open('bookmarks_limit_exceed');

      return of(action);
    })

  ));

  public constructor(
    private _actions$: Actions,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _store$: Store<BookmarkState>,
    private _zubrStoreConfig: ZubrStore,
    private _translateService: TranslateService
  ) {}
}
