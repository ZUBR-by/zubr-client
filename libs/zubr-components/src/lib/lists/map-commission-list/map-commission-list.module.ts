import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ListOperationsPanelModule } from '../../general/list-operations-panel';
import { MapCommissionListComponent } from './map-commission-list.component';

/**
 * Commission list module
 * @description
 * @export
 * @class MapCommissionListModule
 */
@NgModule({
  declarations: [MapCommissionListComponent],
  exports: [
    MapCommissionListComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ZubrUiElementsModule,
    RouterModule,
    TranslateModule,
    ListOperationsPanelModule,
    MatListModule,
  ],
})
export class MapCommissionListModule { }
