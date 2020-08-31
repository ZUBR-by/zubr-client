import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ToolbarMobileComponent } from './toolbar-mobile.component';

/**
 * ToolbarMobile module
 * @description
 * @export
 * @class ToolbarMobileModule
 */
@NgModule({
  declarations: [ToolbarMobileComponent],
  exports: [
    ToolbarMobileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule,
    ZubrUiElementsModule,
    MatBadgeModule,
  ],
})
export class ToolbarMobileModule { }
