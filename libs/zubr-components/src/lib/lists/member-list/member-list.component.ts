import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectTotalCountOfMembers, AppState, Member, MemberEntityService } from '@zubr-client/zubr-store';
import { DataGridOptions, EntityDataSource } from '@zubr-client/zubr-ui-elements';

/**
 * Member list component
 * @description
 * @export
 * @class MemberListComponent
 */
@Component({
  selector: 'zubr-client-member-list',
  templateUrl: './member-list.component.html',
})
export class MemberListComponent {

  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   * @memberof MemberListComponent
   */
  public dataGridOptions: DataGridOptions<Member> = {
    dataSource: new EntityDataSource(
      this._memberEntityService // custom server-side entity data source
    ),
    columns: [
      {
        label: 'photoUrl', // label should be exactly as the property name
        displayName: '', // displayed name of column header
        visibleOnMobile: true, // display column on mobile, by default it's false
        displayType: 'image',
      },
      {
        label: 'fullName',
        displayName: 'full_name',
        visibleOnMobile: true,
        titled: true,
      },
      {
        label: 'workTitle',
        displayName: 'work_title',
        visibleOnMobile: false,
      },
      {
        label: 'description',
        displayName: 'consignment_representative',
        visibleOnMobile: true,
      },
    ],
    entityOptions: {
      count: 10, // initial count of records per page
      page: 1, // initial page number
      searchBy: '', // search by specific key, but default it's null
      search: '',
      sort: 'name', // key to sort
    },
    routerLinkPrefix: '/elections/member/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterKey: 'positionType',
    additionalFilterControl: new FormControl(''),
    additionalFilterControl2: new FormControl(undefined), // additional filter
    emptyMessageTitle: 'no_members_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfMembers),
  };

  public constructor(
    private _memberEntityService: MemberEntityService,
    private _store$: Store<AppState>
  ) {}
}
