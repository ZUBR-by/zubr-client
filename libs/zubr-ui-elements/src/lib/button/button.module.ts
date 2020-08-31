import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './button.component';

/**
 * Button module
 * @description
 * @export
 * @class ButtonModule
 */
@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [ButtonComponent],
})
export class ButtonModule { }
