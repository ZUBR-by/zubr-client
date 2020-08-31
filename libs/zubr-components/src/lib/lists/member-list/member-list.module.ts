import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { MemberListComponent } from './member-list.component';

/**
 * Member list module
 * @description
 * @export
 * @class MemberListModule
 */
@NgModule({
  declarations: [MemberListComponent],
  exports: [
    MemberListComponent,
  ],
  imports: [
    CommonModule,
    ZubrUiElementsModule,
    RouterModule,
    TranslateModule,
    ListOperationsPanelModule,
    MatButtonToggleModule,
  ],
})
export class MemberListModule { }
