import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BadRequest, CsvImportResponse } from '@zubr-client/zubr-interfaces';

/**
 * Csv import dialog component
 * @description
 * @export
 * @class CsvImportDialogComponent
 */
@Component({
  selector: 'zubr-client-csv-import-dialog',
  templateUrl: './csv-import-dialog.component.html',
})
export class CsvImportDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: BadRequest | CsvImportResponse,
    public dialogRef: MatDialogRef<CsvImportDialogComponent>) {}
}
