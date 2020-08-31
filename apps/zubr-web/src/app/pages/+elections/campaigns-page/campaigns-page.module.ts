import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { CampaignsPageComponent } from './campaigns-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CampaignsPageComponent,
  },
];

/**
 * Detailed member view page module
 * @description
 * @export
 * @class CampaignsPageModule
 */
@NgModule({
  declarations: [CampaignsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
  ],
})
export class CampaignsPageModule { }
