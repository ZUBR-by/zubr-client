import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleOptions } from './toggle-options.interface';

/**
 * Slide toggle component
 * @description
 * @export
 * @class SlideToggleComponent
 */
@Component({
  selector: 'zubr-client-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
})
export class SlideToggleComponent {

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof SlideToggleComponent
   */
  public controlValue: FormControl;

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof SlideToggleComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof SlideToggleComponent
   */
  @Input()
  public set formControl(val: FormControl) {
    this.controlValue = val;
    this.controlChange.emit(this.controlValue);
  }

  public get formControl(): FormControl {
    return this.controlValue;
  }

  /**
   * Slide toggle configuration options
   * @description
   * @type {ToggleOptions}
   * @memberof SlideToggleComponent
   */
  @Input() public options: ToggleOptions;

  /**
   * Get error messages
   * @description
   * @readonly
   * @memberof SlideToggleComponent
   */
  public get formControlErrorMessages(): string[] {
    const controlErrorMessages: string[] = [];
    if (typeof this.formControl.errors === 'object') {
      for (const propertyName in this.formControl.errors) {
        if (this.formControl.errors.hasOwnProperty(propertyName)
          && this.formControl.touched) {
          controlErrorMessages.push(
            propertyName
          );
        }
      }
    }

    return controlErrorMessages;
  }

}
