import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { OrganizationDetailPageComponent } from './organization-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: OrganizationDetailPageComponent,
  },
];

/**
 * Detailed organization view page module
 * @description
 * @export
 * @class StationDetailPageModule
 */
@NgModule({
  declarations: [
    OrganizationDetailPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
    ReactiveFormsModule,
  ],
})
export class OrganizationDetailPageModule { }
