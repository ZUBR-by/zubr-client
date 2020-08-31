import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectTotalCountOfOrganizations,
  AppState,
  Organization,
  OrganizationEntityService
} from '@zubr-client/zubr-store';
import { DataGridOptions, EntityDataSource } from '@zubr-client/zubr-ui-elements';

/**
 * Organization list component
 * @description
 * @export
 * @class OrganizationListComponent
 */
@Component({
  selector: 'zubr-client-organization-list',
  templateUrl: './organization-list.component.html',
})
export class OrganizationListComponent {

  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   */
  public dataGridOptions: DataGridOptions<Organization> = {
    dataSource: new EntityDataSource(
      this._organizationEntityService // custom server-side entity data source
    ),
    columns: [
      {
        label: 'name',
        displayName: 'name',
        titled: true,
        visibleOnMobile: true,
      },
      {
        label: 'location',
        displayName: 'address',
      },
      {
        label: 'type',
        displayName: 'category',
        visibleOnMobile: true,
        labelPrefix: 'organization_type',
        badged: true,
      },
    ],
    entityOptions: {
      count: 10, // initial count of records per page
      page: 1, // initial page number
      searchBy: '', // search by specific key, but default it's null
      search: '',
    },
    routerLinkPrefix: '/elections/organization/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl2: new FormControl(undefined), // additional filter
    emptyMessageTitle: 'no_organizations_found', // no records found message
    additionalFilterKey: 'type',
    additionalFilterControl: new FormControl(''),
    totalPageCount: this._store$.select<number>(selectTotalCountOfOrganizations),
  };

  public constructor(
    private _organizationEntityService: OrganizationEntityService,
    private _store$: Store<AppState>
  ) {}
}
