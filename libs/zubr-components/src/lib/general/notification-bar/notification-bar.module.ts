import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { NotificationBarComponent } from './notification-bar.component';

/**
 * NotificationBar module
 * @description
 * @export
 * @class NotificationBarModule
 */
@NgModule({
  declarations: [NotificationBarComponent],
  exports: [
    NotificationBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ZubrUiElementsModule,
    MatBadgeModule,
  ],
})
export class NotificationBarModule { }
