import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { LandingPageComponent } from './landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
];

/**
 * Fallback page view module
 * @description
 * @export
 * @class NotFoundPageModule
 */
@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ZubrUiElementsModule,
  ],
})

export class LandingPageModule { }
