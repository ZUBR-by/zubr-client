import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataGridOptions } from '@zubr-client/zubr-ui-elements';
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap
} from 'rxjs/operators';
import { columnToQuery } from './column-to-query';

export const DEBOUNCE_TIME: number = 350;

/**
 * Data grid component
 * @description
 * @export
 * @class DataGridComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'zubr-client-data-grid', // use it from the page modules
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})

/**
 * @class DataGridComponent
 * @description Universal DataGrid UI based on Angular CDK
 * and Material Paginator / Sort
 * @package '@zubr-client/zubr-ui-elements'
 */
export class DataGridComponent<T> implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Data grid configuration options
   * @description
   * @type {DataGridOptions}
   * @memberof DataGridComponent
   */
  @Input() public dataGridOptions: DataGridOptions<T>;

  /**
   * MatPaginator reference
   * @description
   * @type {MatPaginator}
   * @memberof DataGridComponent
   */
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  /**
   * MatSort reference
   * @description
   * @type {MatSort}
   * @memberof DataGridComponent
   */
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  /**
   * Data grid columns to display
   * @description
   * @type {string[]}
   * @memberof DataGridComponent
   */
  public displayedColumns: string[] = [];

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof StationDetailPageComponent
   */
  private _stop$: Subject<void> = new Subject();

  /**
   * Initial subsription setup
   * @description
   * @memberof DataGridComponent
   */

  public ngOnInit() {

    this.paginator.pageSize = this.dataGridOptions.entityOptions.count;

    this.loadDataSource();

    this.dataGridOptions.dataSource
      .load(this.dataGridOptions.entityOptions)
      .pipe(takeUntil(this._stop$))
      .subscribe();

    // Get columns to be displayed from data grid options

    this.dataGridOptions.columns.find(column => {
      this.displayedColumns = [...this.displayedColumns, column.label];
    });
  }

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof StationDetailPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  /**
   * Input event subscriptions
   * @description
   * @memberof DataGridComponent
   */
  public ngAfterViewInit() {
    // Server-side search

    this.dataGridOptions.searchControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDataSource();
        }),
        takeUntil(this._stop$)
      )
      .subscribe();

    // Additional server-side filtering

    this.dataGridOptions.additionalFilterControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDataSource();
        }),
        takeUntil(this._stop$)
      )
      .subscribe();

    // Additional server-side filtering

    this.dataGridOptions.additionalFilterControl2.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDataSource();
        }),
        takeUntil(this._stop$)
      )
      .subscribe();

    // Server-side filtering

    this.dataGridOptions.searchKeyControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDataSource();
        }),
        takeUntil(this._stop$)
      )
      .subscribe();

    // Reset the paginator after sorting

    this.sort.sortChange
      .pipe(takeUntil(this._stop$))
      .subscribe(() => (this.paginator.pageIndex = 0));

    // On sort or paginate events, load a new page

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDataSource()),
        takeUntil(this._stop$)
      )
      .subscribe();
  }

  /**
   * Data source configuration and subscription
   * @description
   * @memberof DataGridComponent
   */
  public loadDataSource(): void {

    if (this.dataGridOptions.entityOptions.sortBy) {
      // tslint:disable-next-line:no-dynamic-delete
      delete this.dataGridOptions.entityOptions[
        // tslint:disable-next-line:no-dynamic-delete
        `sort[${this.dataGridOptions.entityOptions.sortBy}]`
        ];
    }

    if (this.sort.active) {
      this.dataGridOptions.entityOptions[`sort[${this.sort.active}]`] = this.sort.direction;
    }

    // Redefine data grid options by the latest values

    const sortParam: any = this.sort.active
      ? this.sort.active
      : this.dataGridOptions.entityOptions.sort;

    this.dataGridOptions.entityOptions = {
      ...this.dataGridOptions.entityOptions,

      pagination: true,
      page: (this.paginator.pageIndex + 1),
      count: this.paginator.pageSize,
      search: this.dataGridOptions.searchControl.value,
      sortBy: sortParam,

    };

    if (this.dataGridOptions.additionalFilterKey && this.dataGridOptions.additionalFilterControl) {
      this.dataGridOptions.entityOptions[this.dataGridOptions.additionalFilterKey] =
        this.dataGridOptions.additionalFilterControl.value;
    }

    if (this.dataGridOptions.additionalFilterKey2 && this.dataGridOptions.additionalFilterControl2) {
      this.dataGridOptions.entityOptions[this.dataGridOptions.additionalFilterKey2] =
        this.dataGridOptions.additionalFilterControl2.value;
    }

    if (this.dataGridOptions.staticQueryParams) {
      this.dataGridOptions.staticQueryParams.forEach(param => {
        this.dataGridOptions.entityOptions[param.key] = param.value;
      });
    }

    // Update data source

    this.dataGridOptions.dataSource
      .load(this.dataGridOptions.entityOptions)
      .pipe(takeUntil(this._stop$))
      .subscribe();
  }
}
