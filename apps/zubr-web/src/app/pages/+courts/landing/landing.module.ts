import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { LandingComponent } from './landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
];

/**
 * A page module for maping out stuff
 * @description
 * @export
 * @class MapPageModule
 */
@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class LandingModule { }
