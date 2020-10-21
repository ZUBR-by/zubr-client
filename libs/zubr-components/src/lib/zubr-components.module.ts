import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommissionMapModule } from './general/commission-map';
import { ConfirmationDialogModule } from './general/confirmation-dialog';
import { LanguageSwitcherModule } from './general/language-switcher';
import { ListOperationsPanelModule } from './general/list-operations-panel';
import { NotificationBarModule } from './general/notification-bar';
import { PageNotFoundModule } from './general/page-not-found';
import { PageTabsModule } from './general/page-tabs';
import { SidebarModule } from './general/sidebar';
import { SidebarAdminModule } from './general/sidebar-admin';
import { SidebarCourtsModule } from './general/sidebar-courts';
import { ToolbarMobileModule } from './general/toolbar-mobile';
import { CommissionListModule } from './lists/commission-list/commission-list.module';
import { CourtListModule } from './lists/court-list/court-list.module';
import { EmbedBookmarkListModule } from './lists/embed-bookmark-list';
import { EmbedMemberListModule } from './lists/embed-member-list';
import { MemberListModule } from './lists/member-list/member-list.module';
import { MessageListModule } from './lists/message-list/message-list.module';
import { OrganizationListModule } from './lists/organization-list/organization-list.module';
/**
 * Assembled components module
 * @description
 * @export
 * @class ZubrComponentsModule
 */
@NgModule({
  imports: [CommonModule],
  exports: [
    LanguageSwitcherModule,
    ListOperationsPanelModule,
    PageTabsModule,
    SidebarModule,
    SidebarCourtsModule,
    ToolbarMobileModule,
    CommissionListModule,
    MemberListModule,
    CourtListModule,
    CommissionMapModule,
    EmbedMemberListModule,
    PageNotFoundModule,
    ConfirmationDialogModule,
    EmbedBookmarkListModule,
    OrganizationListModule,
    NotificationBarModule,
    SidebarAdminModule,
    MessageListModule,
  ],
})
export class ZubrComponentsModule {}
