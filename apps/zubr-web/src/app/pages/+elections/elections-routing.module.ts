import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGuardService } from '@zubr-client/zubr-common';
import { ElectionsComponent } from './elections.component';

export const routes: Routes = [
  {
    path: '',
    component: ElectionsComponent,
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
        path: 'bookmarks',
        loadChildren: () => import(
          './bookmarks-page/bookmarks-page.module'
          ).then(m => m.BookmarksPageModule),
        data: {
          title: 'my_subscriptions',
          favicon: 'bookmarks',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'candidates',
        loadChildren: () => import(
          './candidates-page/candidates-page.module'
          ).then(m => m.CandidatesPageModule),
        data: {
          title: 'candidates',
          favicon: 'assignment_ind',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'campaigns',
        loadChildren: () => import(
          './campaigns-page/campaigns-page.module'
          ).then(m => m.CampaignsPageModule),
        data: {
          title: 'campaigns',
          favicon: 'settings_input_antenna',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'about',
        loadChildren: () => import(
          './about-page/about-page.module'
          ).then(m => m.AboutPageModule),
        data: {
          title: 'about',
          favicon: 'favorite',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'verify',
        loadChildren: () => import(
          './verify-page/verify-page.module'
          ).then(m => m.VerifyPageModule),
        data: {
          title: 'verify',
          favicon: 'verified_user',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'privacy',
        loadChildren: () => import(
          './privacy-page/privacy-page.module'
          ).then(m => m.PrivacyPageModule),
        data: {
          title: 'privacy_policy',
          favicon: 'description',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'rules',
        loadChildren: () => import(
          './rules-page/rules-page.module'
          ).then(m => m.RulesPageModule),
        data: {
          title: 'rules_of_forums',
          favicon: 'description',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'commissions',
        loadChildren: () => import(
          './+commission/commission-list-page/commission-list-page.module'
          ).then(m => m.CommissionListPageModule),
        data: {
          title: 'commissions',
          favicon: 'account_balance',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'commission/:id',
        loadChildren: () => import(
          './+commission/commission-detail-page/commission-detail-page.module'
          ).then(m => m.CommissionDetailPageModule),
        data: {
          title: 'commission',
          favicon: 'account_balance',
          navigateToPageTab: true,
          dynamicPageTabView: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'messages',
        loadChildren: () => import(
          './+message/message-list-page/message-list-page.module'
          ).then(m => m.MessageListPageModule),
        data: {
          title: 'incidents',
          favicon: 'add_alert',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'message/:id',
        loadChildren: () => import(
          './+message/message-detail-page/message-detail-page.module'
          ).then(m => m.MessageDetailPageModule),
        data: {
          title: 'incident',
          favicon: 'add_alert',
          navigateToPageTab: true,
          dynamicPageTabView: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'organizations',
        loadChildren: () => import(
          './+organization/organization-list-page/organization-list-page.module'
          ).then(m => m.OrganizationListPageModule),
        data: {
          title: 'organizations',
          favicon: 'flag',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'organization/:id',
        loadChildren: () => import(
          './+organization/organization-detail-page/organization-detail-page.module'
          ).then(m => m.OrganizationDetailPageModule),
        data: {
          title: 'organization',
          favicon: 'account_box',
          navigateToPageTab: true,
          dynamicPageTabView: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'members',
        loadChildren: () => import(
          './+member/member-list-page/member-list-page.module'
          ).then(m => m.MemberListPageModule),
        data: {
          title: 'members',
          favicon: ' assignment_ind ',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'member/:id',
        loadChildren: () => import(
          './+member/member-detail-page/member-detail-page.module'
          ).then(m => m.MemberDetailPageModule),
        data: {
          title: 'member',
          favicon: 'account_box',
          navigateToPageTab: true,
          dynamicPageTabView: true,
        },
        canActivate: [PageGuardService],
      },

      {
        path: 'test',
        loadChildren: () => import('./test-page/test-page.module'
          ).then(m => m.TestPageModule),
        data: {
          title: 'test',
          navigateToPageTab: true,
        },
        canActivate: [PageGuardService],
      },
      {
        path: 'results',
        loadChildren: () => import('./results-page/results-page.module'
          ).then(m => m.ResultsPageModule),
        data: {
          title: 'results',
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

/**
 * Elections routing module
 * @description
 * @export
 * @class ElectionsRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class ElectionsRoutingModule {}
