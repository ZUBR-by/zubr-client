import { Component, Input } from '@angular/core';

/**
 * PageNotFound component
 * @description
 * @export
 * @class PageNotFoundComponent
 */
@Component({
  selector: 'zubr-client-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
  /**
   * message
   * @description
   */
  @Input()
  public message: string;
}
