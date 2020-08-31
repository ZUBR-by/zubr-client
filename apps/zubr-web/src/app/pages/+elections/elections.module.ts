import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ElectionsRoutingModule } from './elections-routing.module';
import { ElectionsComponent } from './elections.component';

/**
 * Elections module
 * @description
 * @export
 * @class ElectionsModule
 */
@NgModule({
  declarations: [ElectionsComponent],
  imports: [
    CommonModule,
    ElectionsRoutingModule,
    ZubrComponentsModule,
  ],
})
export class ElectionsModule { }
