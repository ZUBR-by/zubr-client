import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * App's language switcher component
 * @description
 * @export
 * @class LanguageSwitcherComponent
 */
@Component({
  selector: 'zubr-client-language-switcher',
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {

  public constructor(
    private _translateService: TranslateService
  ) {}

  /**
   * Display language switcher
   * @description
   * @param {string} language
   * @memberof LanguageSwitcherComponent
   */
  public setLanguage(language: string): void {
    this._translateService.setDefaultLang(language);
    this._translateService.use(language);
  }

}
