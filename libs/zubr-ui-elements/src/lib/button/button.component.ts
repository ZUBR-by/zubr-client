import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonOptions } from './button-options.interface';

/**
 * Button component
 * @description
 * @export
 * @class ButtonComponent
 */
@Component({
  selector: 'zubr-client-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {

  /**
   * Configuration options
   * @description
   * @type {ButtonOptions}
   * @memberof ButtonComponent
   */
  @Input() public options: ButtonOptions = {};

  /**
   * Mouse click event
   * @description
   * @type {EventEmitter<MouseEvent>}
   * @memberof ButtonComponent
   */
  @Output() public clicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * Mousce click handler
   * @description
   * @param {MouseEvent} event
   * @memberof ButtonComponent
   */
  public click(event: MouseEvent) {
    event.preventDefault();
    this.clicked.emit(event);
  }
}
