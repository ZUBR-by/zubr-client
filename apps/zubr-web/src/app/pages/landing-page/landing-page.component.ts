import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { LanguageService } from '@zubr-client/zubr-common';

/**
 * Fallback page component
 * @description
 * @export
 * @class NotFoundPageComponent
 */
@Component({
  selector: 'zubr-client-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnDestroy {

  public constructor(private renderer: Renderer2, private _languageService: LanguageService) {
    this.renderer.addClass(document.body, 'landing-body');
  }

  /**
   * Change language
   */
  public changeLanguage(lang: string): void {
    this._languageService.changeLanguage(lang);
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'landing-body');
  }
}
