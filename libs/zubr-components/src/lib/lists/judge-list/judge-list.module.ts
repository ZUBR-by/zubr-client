import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { JudgeListComponent } from './judge-list.component';
import {CommissionMapModule} from "../../general/commission-map";

@NgModule({
  declarations: [JudgeListComponent],
  exports: [
    JudgeListComponent,
  ],
    imports: [
        CommonModule,
        ZubrUiElementsModule,
        RouterModule,
        TranslateModule,
        ListOperationsPanelModule,
        MatButtonToggleModule,
        CommissionMapModule,
    ],
})
export class JudgeListModule { }
