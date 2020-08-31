import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ValueLabel } from '@zubr-client/zubr-interfaces';
import {
  selectTotalCountOfMessages,
  AppState,
  Message,
  MessageEntityService
} from '@zubr-client/zubr-store';
import { DataGridOptions, EntityDataSource } from '@zubr-client/zubr-ui-elements';

/**
 * Message list component
 * @description
 * @export
 * @class MessageListComponent
 */
@Component({
  selector: 'zubr-client-message-list',
  templateUrl: './message-list.component.html',
})
export class MessageListComponent {

  /**
   * Possible messages
   * @description
   * @type {ValueLabel[]}
   */
  public categories: ValueLabel[] = [
    { value: 0, label: this._translateService.instant('violation_type_0') },
    { value: 1, label: this._translateService.instant('violation_type_1') },
    { value: 2, label: this._translateService.instant('violation_type_2') },
    { value: 3, label: this._translateService.instant('violation_type_3') },
    { value: 4, label: this._translateService.instant('violation_type_4') },
    { value: 5, label: this._translateService.instant('violation_type_5') },
    { value: 6, label: this._translateService.instant('violation_type_6') },
    { value: 7, label: this._translateService.instant('violation_type_7') },
    { value: 8, label: this._translateService.instant('violation_type_8') },
    { value: 9, label: this._translateService.instant('violation_type_9') },
    { value: 10, label: this._translateService.instant('violation_type_10') },
    { value: 11, label: this._translateService.instant('violation_type_11') },
  ];
  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   */
  public dataGridOptions: DataGridOptions<Message> = {
    dataSource: new EntityDataSource(
      this._messageEntityService // custom server-side entity data source
    ),
    columns: [
      {
        label: 'commissionCode',
        displayName: 'commission',
        titled: true,
        visibleOnMobile: true,
        fontSizeSmall: false,
      },
      {
        label: 'categories',
        displayName: 'categories',
        labelPrefix: 'violation_type',
        displayType: 'array',
      },
      {
        label: 'description',
        displayName: 'description',
        visibleOnMobile: true,
        fontSizeSmall: false,
      },
      {
        label: 'createdAt',
        displayName: 'date',
        visibleOnMobile: true,
        displayType: 'date',
      },
      {
        label: 'initiative',
        displayName: 'initiative',
        labelPrefix: 'initiative',
        badged: true,
      },
    ],
    entityOptions: {
      count: 10, // initial count of records per page
      page: 1, // initial page number
      searchBy: '', // search by specific key, but default it's null
      search: '',
    },
    routerLinkPrefix: '/elections/message/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(undefined), // additional filter
    additionalFilterKey: 'categories', // filter key
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey2: 'initiative', // filter key
    staticQueryParams: [
      {
        key: 'exists[approvedAt]',
        value: 'true',
      },
      {
        key: 'sort[createdAt]',
        value: 'desc',
      },
    ],
    emptyMessageTitle: 'no_messages_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfMessages),
  };

  public constructor(
    private _messageEntityService: MessageEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>
  ) {}
}
