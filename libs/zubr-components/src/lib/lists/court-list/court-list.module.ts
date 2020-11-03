import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { CourtListComponent } from './court-list.component';
import {CommissionMapModule} from "../../general/commission-map";

@NgModule({
  declarations: [CourtListComponent],
  exports: [
    CourtListComponent,
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
export class CourtListModule { }
