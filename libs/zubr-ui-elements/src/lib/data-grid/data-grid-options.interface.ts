import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataGridColumnOptions } from './data-grid-column-options.interface';
import { DataGridEntityOptions } from './data-grid-entity-options.interface';
import { EntityDataSource } from './entity-data-source';

export interface DataGridOptions<T> {
  /**
   * Component's source of data
   * @description
   * @type {EntityDataSource}
   * @memberof DataGridOptions
   */
  dataSource: EntityDataSource<T>;
  /**
   * Columns
   * @description
   * @type {DataGridColumnOptions[]}
   * @memberof DataGridOptions
   */
  columns: DataGridColumnOptions[];
  /**
   * Configuration options
   * @description
   * @type {DataGridEntityOptions}
   * @memberof DataGridOptions
   */
  entityOptions: DataGridEntityOptions | any;
  /**
   * Router link prefix
   * @description
   * @type {string}
   * @memberof DataGridOptions
   */
  routerLinkPrefix: string;
  /**
   * Router link key
   * @description
   * @type {string}
   * @memberof DataGridOptions
   */
  routerLinkKey: string;
  /**
   * Pagination flag
   * @description
   * @type {boolean}
   * @memberof DataGridOptions
   */
  enablePagination: boolean;
  /**
   * Sorting flag
   * @description
   * @type {boolean}
   * @memberof DataGridOptions
   */
  enableSorting: boolean;
  /**
   * Search control
   * @description
   * @type {AbstractControl}
   * @memberof DataGridOptions
   */
  searchControl: AbstractControl;
  /**
   * Search control key
   * @description
   * @type {AbstractControl}
   * @memberof DataGridOptions
   */
  searchKeyControl: AbstractControl;
  /**
   * Empty list message
   * @description
   * @type {string}
   * @memberof DataGridOptions
   */
  emptyMessageTitle: string;
  /**
   * Total page count
   * @description
   * @type {(Observable<number> | number)}
   * @memberof DataGridOptions
   */
  totalPageCount: Observable<number> | number;
  /**
   * Additional filter key
   * @description
   * @type {string}
   * @memberof DataGridOptions
   */
  additionalFilterKey?: string;
  /**
   * Additional filter control
   * @description
   * @type {AbstractControl}
   * @memberof DataGridOptions
   */
  additionalFilterControl?: AbstractControl;
  /**
   * Additional filter key
   * @description
   * @type {string}
   * @memberof DataGridOptions
   */
  additionalFilterKey2?: string;
  /**
   * Additional filter control
   * @description
   * @type {AbstractControl}
   * @memberof DataGridOptions
   */
  additionalFilterControl2?: AbstractControl;
  /**
   * Additional filter control
   * @description
   * @type {AbstractControl}
   * @memberof DataGridOptions
   */
  staticQueryParams?: {
    /**
     * Property
     */
    key: string;
    /**
     * Property
     */
    value: string;
  }[];
}
