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
        path: 'court',
        loadChildren: () => import(
          './court-list-page/court-list-page.module'
          ).then(m => m.CourtListPageModule),
        data: {
          title: 'courts',
          favicon: 'account_balance',
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'court/:id',
        loadChildren: () => import(
          './court-detail-page/court-detail-page.module'
          ).then(m => m.CourtDetailPageModule),
        data: {
          title: 'court',
          favicon: 'account_balance',
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'judge',
        loadChildren: () => import(
          './judge-list-page/judge-list-page.module'
          ).then(m => m.JudgeListPageModule),
        data: {
          title: 'judges',
          favicon: 'account_balance',
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'judge/:id',
        loadChildren: () => import(
          './judge-detail-page/judge-detail-page.module'
          ).then(m => m.JudgeDetailPageModule),
        data: {
          title: 'judges',
          favicon: 'account_balance',
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
