import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'c',
    pathMatch: 'full',
  },
  {
    path: 'c',
    loadChildren: () => import('./pages/+courts/courts.module')
      .then(m => m.CourtsModule),
  },
  {
    path: 'elections',
    loadChildren: () => import('./pages/+elections/elections.module')
      .then(m => m.ElectionsModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found-page/not-found-page.module')
      .then(m => m.NotFoundPageModule),
  },
];

/**
 * Root routing module
 * @description
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule {}
