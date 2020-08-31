import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { OrganizationListComponent } from './organization-list.component';

/**
 * Organization list module
 * @description
 * @export
 * @class OrganizationListModule
 */
@NgModule({
  declarations: [OrganizationListComponent],
  exports: [
    OrganizationListComponent,
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
export class OrganizationListModule { }
