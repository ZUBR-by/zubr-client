import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyFormComponent, ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { VerifyPageComponent } from './verify-page.component';

export const routes: Routes = [
  {
    path: '',
    component: VerifyPageComponent,
  },
];

/**
 * Fallback page view module
 * @description
 * @export
 * @class VerifyPageModule
 */
@NgModule({
  declarations: [VerifyPageComponent, VerifyFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
    MatExpansionModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class VerifyPageModule {

}
