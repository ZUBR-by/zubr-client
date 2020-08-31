import { Component, Inject, Input } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import {
  AppState,
  Commission,
  CommissionEntityService
} from '@zubr-client/zubr-store';
import { MapCommissionListOptions } from './map-commission-list-options.interface';

/**
 * Commission list component
 * @description
 * @export
 * @class MapCommissionListComponent
 */
@Component({
  selector: 'zubr-client-map-commission-list',
  templateUrl: './map-commission-list.component.html',
})
export class MapCommissionListComponent {

  /**
   * commissions
   * @description
   */
  @Input()
  public get commissions(): Commission[] {
    return this._commissions;
  }

  /**
   * commissions
   * @description
   */
  public set commissions(commissions: Commission[]) {
    this._commissions = commissions;
  }
  /**
   * commissionIds
   * @description
   */
  @Input()
  public commissionIds: number[];

  /**
   * selectedCommissions
   * @description
   */
  public selectedCommissions: Commission[];

  /**
   * _commissions
   * @description
   */
  private _commissions: Commission[];

  /**
   * constructor
   * @description
   */
  public constructor(
    private _commissionEntityService: CommissionEntityService,
    private _store$: Store<AppState>,
    private _bottomSheetRef: MatBottomSheetRef<MapCommissionListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: MapCommissionListOptions
  ) {
    this.commissionIds = data.commissionIds;
    this.selectedCommissions = data.commissions.filter(
      commission => this.commissionIds.includes(commission.id)
    ).slice(0, 50);
    this._commissions = data.commissions;
  }

  /**
   * On scroll down
   * @description
   */
  public onScrollDown(): void {}

  /**
   * Open link
   * @description
   */
  public openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
