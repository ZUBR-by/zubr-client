import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogOptions } from '.';

/**
 * Confirmation dialog component
 * @description
 * @export
 * @class ConfirmationDialogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'zubr-client-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: ConfirmationDialogOptions
  ) {
    dialogRef.disableClose = true;
  }
}
