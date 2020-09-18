import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrComponentsModule } from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { MemberDetailPageComponent } from './member-detail-page.component';
import {MatChipsModule} from "@angular/material/chips";

export const routes: Routes = [
  {
    path: '',
    component: MemberDetailPageComponent,
  },
];

/**
 * Detailed member view page module
 * @description
 * @export
 * @class MemberDetailPageModule
 */
@NgModule({
  declarations: [MemberDetailPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ZubrUiElementsModule,
        TranslateModule,
        MatProgressSpinnerModule,
        ZubrComponentsModule,
        ShareButtonsModule,
        ShareIconsModule,
        MatChipsModule,
    ],
})
export class MemberDetailPageModule { }
