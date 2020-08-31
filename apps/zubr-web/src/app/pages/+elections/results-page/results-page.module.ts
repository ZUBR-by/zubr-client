import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ResultsPageComponent } from './results-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ResultsPageComponent,
  },
];

/**
 * A page module for testing out stuff
 * @description
 * @export
 * @class TestPageModule
 */
@NgModule({
  declarations: [ResultsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    ReactiveFormsModule,
    ZubrUiElementsModule,
    ZubrComponentsModule,
  ],
})
export class ResultsPageModule { }
