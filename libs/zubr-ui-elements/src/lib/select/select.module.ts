import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from './select.component';

/**
 * Select module
 * @description
 * @export
 * @class SelectModule
 */
@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
  ],
  exports: [
    SelectComponent,
  ],
})
export class SelectModule { }
