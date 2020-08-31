import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { AboutPageComponent } from './about-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
  },
];

/**
 * Detailed member view page module
 * @description
 * @export
 * @class AboutPageModule
 */
@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
    MatExpansionModule,
  ],
})
export class AboutPageModule { }
