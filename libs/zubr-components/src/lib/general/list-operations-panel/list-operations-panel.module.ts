import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { CsvImportDialogComponent } from './csv-import-dialog';
import { ListOperationsPanelComponent } from './list-operations-panel.component';

/**
 * Table operations panel module
 * @description
 * @export
 * @class ListOperationsPanelModule
 */
@NgModule({
  declarations: [ListOperationsPanelComponent, CsvImportDialogComponent ],
  exports: [
    ListOperationsPanelComponent, CsvImportDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ZubrUiElementsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  entryComponents: [CsvImportDialogComponent],
})
export class ListOperationsPanelModule { }
