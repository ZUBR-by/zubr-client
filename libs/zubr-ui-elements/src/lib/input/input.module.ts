import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { InputComponent } from './input.component';

/**
 * Input module
 * @description
 * @export
 * @class InputModule
 */
@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    InputComponent,
  ],
})
export class InputModule { }
