import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { CommissionListPageComponent } from './commission-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CommissionListPageComponent,
  },
];

/**
 * Commission list page module
 * @description
 * @export
 * @class CommissionListPageModule
 */
@NgModule({
  declarations: [CommissionListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class CommissionListPageModule { }
