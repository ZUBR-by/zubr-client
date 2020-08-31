import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { EmbedBookmarkListComponent } from './embed-bookmark-list.component';

/**
 * Member list module
 * @description
 * @export
 * @class EmbedMemberListModule
 */
@NgModule({
  declarations: [EmbedBookmarkListComponent],
  exports: [
    EmbedBookmarkListComponent,
  ],
  imports: [
    CommonModule,
    ZubrUiElementsModule,
    RouterModule,
    TranslateModule,
    ListOperationsPanelModule,
    MatProgressSpinnerModule,
    MatListModule,
  ],
})
export class EmbedBookmarkListModule { }
