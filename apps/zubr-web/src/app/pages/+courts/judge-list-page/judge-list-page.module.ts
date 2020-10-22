import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { JudgeListPageComponent } from './judge-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: JudgeListPageComponent,
  },
];

@NgModule({
  declarations: [JudgeListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class JudgeListPageModule { }
