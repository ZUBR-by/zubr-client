import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { MemberListPageComponent } from './member-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MemberListPageComponent,
  },
];

/**
 * Member list page module
 * @description
 * @export
 * @class MemberListPageModule
 */
@NgModule({
  declarations: [MemberListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class MemberListPageModule { }
