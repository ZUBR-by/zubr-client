import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Paginator translator
 * @description
 * @export
 * @class PaginatorTranslation
 * @extends {MatPaginatorIntl}
 */
@Injectable()
export class PaginatorTranslation extends MatPaginatorIntl {

  public constructor(
    private _translateService: TranslateService
  ) {
    super();
    this.setLabels();
    _translateService.onLangChange.subscribe(() => {
      this.setLabels();
      this.changes.next();
    });
  }

  /**
   * Set labels
   * @description
   * @memberof PaginatorTranslation
   */
  public setLabels(): void {

    this.itemsPerPageLabel = this._translateService.instant('items_per_page');
    this.firstPageLabel = this._translateService.instant('first_page');
    this.previousPageLabel = this._translateService.instant('previous_page');
    this.nextPageLabel = this._translateService.instant('next_page');
    this.lastPageLabel = this._translateService.instant('last_page');

  }

  /**
   * Page range translator
   * @description
   * @memberof PaginatorTranslation
   */
  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return this._translateService.instant('paginator_no_records', { length });
    }

    const normalizedLength: number = Math.max(length, 0);
    const startIndex: number = page * pageSize;
    const endIndex: number =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return this._translateService.instant('paginator_has_records', {
      startIndex, endIndex, length,
    });
  }
}
