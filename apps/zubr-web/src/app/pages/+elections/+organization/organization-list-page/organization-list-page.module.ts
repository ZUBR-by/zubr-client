import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { OrganizationListPageComponent } from './organization-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: OrganizationListPageComponent,
  },
];

/**
 * Organization list page module
 * @description
 * @export
 * @class OrganizationListPageModule
 */
@NgModule({
  declarations: [OrganizationListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class OrganizationListPageModule { }
