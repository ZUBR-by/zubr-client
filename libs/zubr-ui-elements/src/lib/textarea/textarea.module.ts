import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { TextareaComponent } from './textarea.component';

/**
 * Textarea module
 * @description
 * @export
 * @class TextareaModule
 */
@NgModule({
  declarations: [TextareaComponent],
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
    TextareaComponent,
  ],
})
export class TextareaModule { }
