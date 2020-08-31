import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

/**
 * Confirmation dialog module
 * @export
 * @class ConfirmationDialogModule
 */
@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    ZubrUiElementsModule,
  ],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule { }
