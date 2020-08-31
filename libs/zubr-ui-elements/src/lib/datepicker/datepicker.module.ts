import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { DatepickerComponent } from './datepicker.component';

/**
 * Datepicker module
 * @description
 * @export
 * @class DatepickerModule
 */
@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
  ],
  exports: [
    DatepickerComponent,
  ],
})
export class DatepickerModule { }
