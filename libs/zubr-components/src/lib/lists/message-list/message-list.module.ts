import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { MessageListComponent } from './message-list.component';

/**
 * Message list module
 * @description
 * @export
 * @class MessageListModule
 */
@NgModule({
  declarations: [MessageListComponent],
  exports: [
    MessageListComponent,
  ],
  imports: [
    CommonModule,
    ZubrUiElementsModule,
    RouterModule,
    TranslateModule,
    ListOperationsPanelModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class MessageListModule { }
