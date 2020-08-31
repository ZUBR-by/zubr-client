import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectTotalCountOfCommissions,
  AppState,
  Commission,
  CommissionEntityService
} from '@zubr-client/zubr-store';
import { DataGridOptions, EntityDataSource } from '@zubr-client/zubr-ui-elements';

/**
 * Commission list component
 * @description
 * @export
 * @class CommissionListComponent
 */
@Component({
  selector: 'zubr-client-commission-list',
  templateUrl: './commission-list.component.html',
})
export class CommissionListComponent {

  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   */
  public dataGridOptions: DataGridOptions<Commission> = {
    dataSource: new EntityDataSource(
      this._commissionEntityService // custom server-side entity data source
    ),
    columns: [
      {
        label: 'code',
        displayName: 'commission',
        titled: true,
        visibleOnMobile: false,
        fontSizeSmall: false,
      },
      {
        label: 'name',
        displayName: 'name',
      },
      {
        label: 'description',
        displayName: 'organization',
        visibleOnMobile: true,
        titled: true,
      },
      {
        label: 'location',
        displayName: 'address',
        visibleOnMobile: true,
      },
    ],
    entityOptions: {
      count: 10, // initial count of records per page
      page: 1, // initial page number
      searchBy: '', // search by specific key, but default it's null
      search: '',
    },
    routerLinkPrefix: '/elections/commission/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(''), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'type', // filter key
    emptyMessageTitle: 'no_commissions_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfCommissions),
  };

  public constructor(
    private _commissionEntityService: CommissionEntityService,
    private _store$: Store<AppState>
  ) {}
}
