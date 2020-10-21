import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGuardService } from '@zubr-client/zubr-common';
import { CourtsComponent } from './courts.component';

export const routes: Routes = [
  {
    path: '',
    component: CourtsComponent,
    children: [

      {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full',
      },

      {
        path: 'map',
        loadChildren: () => import(
          './map-page/map-page.module'
          ).then(m => m.MapPageModule),
        data: {
          title: 'map_of_elections',
          favicon: 'map',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },
      {
        path: '**',
        loadChildren: () => import(
          '../not-found-page/not-found-page.module'
          ).then(m => m.NotFoundPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class CourtsRoutingModule {}
