import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { SidebarComponent } from './sidebar.component';

/**
 * Sidebar module
 * @description
 * @export
 * @class SidebarModule
 */
@NgModule({
  declarations: [SidebarComponent],
  exports: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ZubrUiElementsModule,
    MatBadgeModule,
  ],
})
export class SidebarModule { }
