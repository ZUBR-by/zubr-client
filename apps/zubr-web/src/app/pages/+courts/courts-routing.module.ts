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
        redirectTo: 'start',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadChildren: () => import(
          './court-list-page/court-list-page.module'
          ).then(m => m.CourtListPageModule),
        data: {
          title: 'courts',
          favicon: 'account_balance',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'start',
        loadChildren: () => import(
          './landing/landing.module'
          ).then(m => m.LandingModule),
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
