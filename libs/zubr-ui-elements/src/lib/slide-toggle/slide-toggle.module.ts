import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { SlideToggleComponent } from './slide-toggle.component';

/**
 * Slide toggle module
 * @description
 * @export
 * @class SlideToggleModule
 */
@NgModule({
  declarations: [SlideToggleComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  exports: [SlideToggleComponent],
})
export class SlideToggleModule {}
