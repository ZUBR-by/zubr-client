import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { EmbedMemberListComponent } from './embed-member-list.component';
import {MatChipsModule} from "@angular/material/chips";

/**
 * Member list module
 * @description
 * @export
 * @class EmbedMemberListModule
 */
@NgModule({
  declarations: [EmbedMemberListComponent],
  exports: [
    EmbedMemberListComponent,
  ],
    imports: [
        CommonModule,
        ZubrUiElementsModule,
        RouterModule,
        TranslateModule,
        ListOperationsPanelModule,
        MatProgressSpinnerModule,
        MatChipsModule,
    ],
})
export class EmbedMemberListModule { }
