import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

/**
 * Elections component
 * @description
 * @export
 * @class ElectionsComponent
 */
@Component({
  selector: 'zubr-client-elections',
  templateUrl: './elections.component.html',

})
export class ElectionsComponent {

  /**
   * Retrieves current router outlet state
   * @description
   * @param {RouterOutlet} outlet
   * @returns {(ActivatedRoute | string)}
   * @memberof ElectionsComponent
   */
  public getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | string {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
