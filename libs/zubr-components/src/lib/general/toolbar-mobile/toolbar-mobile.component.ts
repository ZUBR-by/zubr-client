import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookmarksCount, AppState } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';

/**
 * ToolbarMobile component
 * @description
 * @export
 * @class ToolbarMobileComponent
 */
@Component({
  selector: 'zubr-client-toolbar-mobile',
  templateUrl: './toolbar-mobile.component.html',
  styleUrls: ['./toolbar-mobile.component.scss'],
})
export class ToolbarMobileComponent {
  /**
   * Bookmarks count
   */
  public bookmarksCount$: Observable<number> = this._store$.select(selectBookmarksCount);
  /**
   *
   * @param _store$
   */
  public constructor(
    private _store$: Store<AppState>
  ) {}
}
