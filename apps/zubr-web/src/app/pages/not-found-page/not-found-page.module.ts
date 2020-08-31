import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { NotFoundPageComponent } from './not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent,
  },
];

/**
 * Fallback page view module
 * @description
 * @export
 * @class NotFoundPageModule
 */
@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ZubrUiElementsModule,
  ],
})
export class NotFoundPageModule { }
