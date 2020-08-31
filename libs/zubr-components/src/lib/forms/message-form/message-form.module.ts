import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ZubrUiElementsModule } from '@zubr-client/zubr-ui-elements';
import { MessageFormComponent } from './message-form.component';

/**
 * Pharmacy form module
 * @description
 * @export
 * @class MessageFormModule
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ZubrUiElementsModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
})
export class MessageFormModule { }
