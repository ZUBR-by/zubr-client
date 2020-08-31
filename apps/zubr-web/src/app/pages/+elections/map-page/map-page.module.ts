import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { MapPageComponent } from './map-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MapPageComponent,
  },
];

/**
 * A page module for maping out stuff
 * @description
 * @export
 * @class MapPageModule
 */
@NgModule({
  declarations: [MapPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class MapPageModule { }
