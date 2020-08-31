import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

/**
 * Language service
 * @export
 * @class LanguageService
 */
@Injectable()
export class LanguageService {
  /**
   * Creates an instance of ErrorService.
   */
  public constructor(private _translateService: TranslateService) {
    _translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        _translateService.use(event.lang);
      }
    );
  }

  /**
   * Initialize
   */
  public init(): void {
    const language: string = localStorage.getItem('language') ? localStorage.getItem('language') : 'ru';
    this.changeLanguage(language);
  }

  /**
   * Change language
   * @param language
   */
  public changeLanguage(language: string): void {
    this._translateService.setDefaultLang(language);
    this._translateService.use(language);
    localStorage.setItem('language', language);
  }
}
