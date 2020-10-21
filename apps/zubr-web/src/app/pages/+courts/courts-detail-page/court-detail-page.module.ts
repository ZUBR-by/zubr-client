import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  MessageFormComponent,
  ObserverFormComponent,
  PublicReportFormComponent,
  ReportFormComponent,
  ZubrComponentsModule
} from '@zubr-client/zubr-components';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CourtDetailPageComponent } from './court-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CourtDetailPageComponent,
  },
];

@NgModule({
  declarations: [
    CourtDetailPageComponent,
    MessageFormComponent,
    ReportFormComponent,
    PublicReportFormComponent,
    ObserverFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZubrUiElementsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ZubrComponentsModule,
    ReactiveFormsModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatInputModule,
    AngularFileUploaderModule,
  ],
})
export class CourtDetailPageModule { }
