import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'zubr-client-courts',
  templateUrl: './courts.component.html',

})
export class CourtsComponent {

  public getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | string {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
