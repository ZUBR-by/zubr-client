import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { MessageListPageComponent } from './message-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MessageListPageComponent,
  },
];

/**
 * Message list page module
 * @description
 * @export
 * @class MessageListPageModule
 */
@NgModule({
  declarations: [MessageListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrComponentsModule,
  ],
})
export class MessageListPageModule { }
