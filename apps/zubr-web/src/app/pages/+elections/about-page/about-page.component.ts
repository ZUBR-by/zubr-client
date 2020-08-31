import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@zubr-client/zubr-store';
import { Subject } from 'rxjs';

/**
 * About component
 * @description
 * @export
 * @class AboutPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-about-page',
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit, OnDestroy {

  /**
   * Description
   */
  public panelOpenState: boolean = false;
  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(
    private _store$: Store<AppState>
  ) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof AboutPageComponent
   */
  public ngOnInit(): void {}

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof AboutPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }
}
