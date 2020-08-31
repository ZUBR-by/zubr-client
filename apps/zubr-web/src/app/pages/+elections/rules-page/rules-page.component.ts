import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@zubr-client/zubr-store';
import { Subject } from 'rxjs';

/**
 * Rules component
 * @description
 * @export
 * @class RulesPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-rules-page',
  templateUrl: './rules-page.component.html',
})
export class RulesPageComponent implements OnInit, OnDestroy {

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
   * @memberof RulesPageComponent
   */
  public ngOnInit(): void {}

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof RulesPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }
}
