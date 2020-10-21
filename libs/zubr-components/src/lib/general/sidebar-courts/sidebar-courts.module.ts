import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { SidebarCourtsComponent } from './sidebar-courts.component';

/**
 * Sidebar module
 * @description
 * @export
 * @class SidebarModule
 */
@NgModule({
  declarations: [SidebarCourtsComponent],
  exports: [
    SidebarCourtsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ZubrUiElementsModule,
    MatBadgeModule,
  ],
})
export class SidebarCourtsModule { }
