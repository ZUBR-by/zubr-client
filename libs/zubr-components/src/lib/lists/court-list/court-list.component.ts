import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  selectTotalCountOfCourts,
  AppState,
  Court,
  CourtEntityService
} from '@zubr-client/zubr-store';
import {DataGridOptions, EntityDataSource} from '@zubr-client/zubr-ui-elements';

@Component({
  selector: 'zubr-client-court-list',
  templateUrl: './court-list.component.html',
})
export class CourtListComponent {

  public dataGridOptions: DataGridOptions<Court> = {
    dataSource: new EntityDataSource(this._courtEntityService),
    columns: [
      {
        label: 'id',
        displayName: 'court',
        titled: true,
      },
      {
        label: 'name',
        displayName: 'name',
      },
      {
        label: 'address',
        displayName: 'address',
        visibleOnMobile: false,
      },
    ],
    entityOptions: {
      count: 20,
      page: 1,
      searchBy: '',
      search: '',
    },
    routerLinkPrefix: '/c/court/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(''), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'type', // filter key
    emptyMessageTitle: 'no_courts_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfCourts),
  };

  public constructor(
    private _courtEntityService: CourtEntityService,
    private _store$: Store<AppState>
  ) {
  }
}
