import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { CourtListPageComponent } from './court-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CourtListPageComponent,
  },
];

@NgModule({
  declarations: [CourtListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class CourtListPageModule { }
