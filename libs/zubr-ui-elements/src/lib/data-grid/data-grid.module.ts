import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from '../button';
import { DataGridComponent } from './data-grid.component';
import { PaginatorTranslation } from './paginator.translation';

/**
 * DataGrid module
 * @description
 * @export
 * @class DataGridModule
 */
@NgModule({
  declarations: [DataGridComponent],
  exports: [
    DataGridComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatSortModule,
    MatPaginatorModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    ButtonModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorTranslation,
      deps: [TranslateService],
    },
  ],
})
export class DataGridModule { }
