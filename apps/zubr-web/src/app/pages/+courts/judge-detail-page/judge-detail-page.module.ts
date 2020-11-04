import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ZubrComponentsModule} from '@zubr-client/zubr-components';
import {ZubrUiElementsModule} from '@zubr-client/zubr-ui-elements';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {JudgeDetailPageComponent} from './judge-detail-page.component';

@NgModule({
  declarations: [
    JudgeDetailPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: JudgeDetailPageComponent,
      },
    ]),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatInputModule,
  ],
})
export class JudgeDetailPageModule {
}
