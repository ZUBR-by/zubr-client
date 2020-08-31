import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { SelectOptions } from './select-options.interface';

/**
 * Select component
 * @description
 * @export
 * @class SelectComponent
 */
@Component({
  selector: 'zubr-client-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof SelectComponent
   */
  public controlValue: FormControl;

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof SelectComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof SelectComponent
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
   * Select configuration options
   * @description
   * @type {SelectOptions}
   * @memberof SelectComponent
   */
  @Input() public options: SelectOptions;

  /**
   * Gets error messages
   * @description
   * @readonly
   * @memberof SelectComponent
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
