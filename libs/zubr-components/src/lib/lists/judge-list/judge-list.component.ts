import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  selectTotalCountOfJudges,
  AppState,
  Judge,
  JudgeEntityService
} from '@zubr-client/zubr-store';
import {DataGridOptions, EntityDataSource} from '@zubr-client/zubr-ui-elements';

@Component({
  selector: 'zubr-client-judge-list',
  templateUrl: './judge-list.component.html',
})
export class JudgeListComponent {

  public dataGridOptions: DataGridOptions<Judge> = {
    dataSource: new EntityDataSource(this._judgeEntityService),
    columns: [
      {
        label: 'photoUrl',
        displayName: '',
        visibleOnMobile: true,
        displayType: 'image',
      },
      {
        titled: true,
        label: 'fullName',
        displayName: 'name'
      },
      {
        label: 'description',
        displayName: 'name'
      },
      {
        label: 'comment',
        displayName: 'name'
      }
    ],
    entityOptions: {
      count: 20,
      page: 1,
      searchBy: '',
      search: '',
    },
    routerLinkPrefix: '/courts/judge/', // static part of record's link
    routerLinkKey: 'id', // dynamic part of record's link (e.g. id)
    enablePagination: true,
    enableSorting: true,
    searchControl: new FormControl(''), // use this control in view file
    searchKeyControl: new FormControl(''), // search in column name
    additionalFilterControl: new FormControl(''), // additional filter
    additionalFilterControl2: new FormControl(undefined), // additional filter
    additionalFilterKey: 'type', // filter key
    emptyMessageTitle: 'no_judges_found', // no records found message
    totalPageCount: this._store$.select<number>(selectTotalCountOfJudges),
  };

  public constructor(
    private _judgeEntityService: JudgeEntityService,
    private _store$: Store<AppState>
  ) {
  }
}
