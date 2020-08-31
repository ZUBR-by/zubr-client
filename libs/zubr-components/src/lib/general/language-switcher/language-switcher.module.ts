import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher.component';

/**
 * App's language switcher module
 * @description
 * @export
 * @class LanguageSwitcherModule
 */
@NgModule({
  declarations: [LanguageSwitcherComponent],
  exports: [
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
})
export class LanguageSwitcherModule { }
