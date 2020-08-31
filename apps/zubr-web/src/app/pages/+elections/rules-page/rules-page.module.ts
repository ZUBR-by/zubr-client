import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { RulesPageComponent } from './rules-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RulesPageComponent,
  },
];

/**
 * Detailed member view page module
 * @description
 * @export
 * @class RulesPageModule
 */
@NgModule({
  declarations: [RulesPageComponent],
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
export class RulesPageModule { }
