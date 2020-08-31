import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { CommissionListComponent } from './commission-list.component';

/**
 * Commission list module
 * @description
 * @export
 * @class CommissionListModule
 */
@NgModule({
  declarations: [CommissionListComponent],
  exports: [
    CommissionListComponent,
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
export class CommissionListModule { }
