import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageTabsComponent } from './page-tabs.component';

/**
 * Page tabs module
 * @description
 * @export
 * @class PageTabsModule
 */
@NgModule({
  declarations: [PageTabsComponent],
  exports: [
    PageTabsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule,
    MatSelectModule,
  ],
})
export class PageTabsModule { }
