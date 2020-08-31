import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BadRequest,
  CsvImportResponse,
  ValueLabel
} from '@zubr-client/zubr-interfaces';
import {
  DataGridColumnOptions,
  DataGridOptions
} from '@zubr-client/zubr-ui-elements';
import { of, Subject } from 'rxjs';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { CsvImportDialogComponent } from './csv-import-dialog';
import { ListOperationsPanelOptions } from './list-operations-panel-options.interface';

/**
 * Table operations panel component
 * @description
 * @export
 * @class ListOperationsPanelComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'zubr-client-list-operations-panel',
  templateUrl: './list-operations-panel.component.html',
})
export class ListOperationsPanelComponent<T> implements OnInit, OnDestroy {
  /**
   * Data grid configuration
   * @description
   * @type {DataGridOptions}
   * @memberof ListOperationsPanelComponent
   */
  @Input() public dataGridOptions: DataGridOptions<T>;
  /**
   * List operations panel configuration
   * @description
   * @type {ListOperationsPanelOptions}
   * @memberof ListOperationsPanelComponent
   */
  @Input() public options: ListOperationsPanelOptions;

  /**
   * Search filter flag
   * @description
   * @type {boolean}
   * @memberof ListOperationsPanelComponent
   */
  public searchFilterMode: boolean = false;
  /**
   * Search criteria
   * @description
   * @type {ValueLabel[]}
   * @memberof ListOperationsPanelComponent
   */
  public searchKeyDataSource: ValueLabel[] = [];
  /**
   * File being uploaded
   * @description
   * @type {File}
   * @memberof ListOperationsPanelComponent
   */
  public fileToUpload: File = null;

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof StationDetailPageComponent
   */
  private _stop$: Subject<void> = new Subject();

  public constructor(public dialog: MatDialog) {}

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof StationDetailPageComponent
   */
  public ngOnInit(): void {
    this.dataGridOptions.columns.forEach((column: DataGridColumnOptions) => {
      if (!column.disableFiltering) {
        this.searchKeyDataSource.push({
          label: column.displayName,
          value: column.label,
        });
      }
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
   * File input handler
   * @description Opens a dialog and uploads the file.
   * Displays a new dialog showing the result.
   * Also sets any errors that are returned
   * @param {Event} event
   * @memberof ListOperationsPanelComponent
   */
  public handleFileInput(event: Event): void {
    this.dataGridOptions.dataSource.loadingSubject$.next(true);

    this.fileToUpload = (<HTMLInputElement> event.target).files.item(0);
    this.dataGridOptions.dataSource
      .importFromCSV(this.fileToUpload)
      .pipe(
        mergeMap(response => {
          this.dialog.open(CsvImportDialogComponent, {
            data: response,
          });

          this.dataGridOptions.dataSource.loadingSubject$.next(false);

          return this.dataGridOptions.dataSource.load(
            this.dataGridOptions.entityOptions
          );
        }),

        catchError((httpErrorResponse: HttpErrorResponse) => {
          let error: BadRequest | CsvImportResponse = {
            id: httpErrorResponse.url,
            status: httpErrorResponse.status,
            message: httpErrorResponse.statusText,
            created: 0,
            updated: 0,
            errors: null,
          };

          if (!(httpErrorResponse.error instanceof ProgressEvent)) {
            error = {
              ...error,
              ...httpErrorResponse.error,
            };
          }

          this.dialog.open(CsvImportDialogComponent, {
            data: error,
          });

          this.dataGridOptions.dataSource.loadingSubject$.next(false);

          return of(httpErrorResponse);
        }),
        takeUntil(this._stop$)
      )
      .subscribe();
  }

  /**
   * Open advanced search filter
   * @description
   * @memberof ListOperationsPanelComponent
   */
  public switchToSearchFilterMode(): void {
    this.searchFilterMode = true;
  }

  /**
   * Close advanced search filter
   * @description
   * @memberof ListOperationsPanelComponent
   */
  public exitSearchFilterMode(): void {
    this.dataGridOptions.searchControl.setValue('');
    this.dataGridOptions.searchKeyControl.setValue('');

    this.searchFilterMode = false;
  }
}
