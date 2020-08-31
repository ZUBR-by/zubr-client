import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@zubr-client/zubr-store';
import { Subject } from 'rxjs';

/**
 * Campaigns component
 * @description
 * @export
 * @class CampaignsPageComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-campaigns-page',
  templateUrl: './campaigns-page.component.html',
})
export class CampaignsPageComponent implements OnInit, OnDestroy {
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
   * @memberof CampaignsPageComponent
   */
  public ngOnInit(): void {}

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof CampaignsPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }
}
