import {
  forwardRef, Component, ContentChild, ElementRef,
  EventEmitter, Input, Output,
} from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { DatepickerOptions } from './datepicker-options.interface';
import { DatepickerType } from './datepicker-type.constants';

/**
 * Datepicker component
 * @description
 * @export
 * @class DatepickerComponent
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
@Component({
  selector: 'zubr-client-datepicker',
  styleUrls: [ './datepicker.component.scss' ],
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => DatepickerComponent
      ),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(
        () => DatepickerComponent
      ),
      multi: true,
    }],
})

/**
 * @class DatepickerComponent
 * @description Universal Datepicker UI
 * @package '@zubr-client/zubr-ui-elements'
 */
export class DatepickerComponent implements ControlValueAccessor, Validator {

  /**
   * Datepicker component's form control datepicker
   * @description
   * @type {ElementRef}
   * @memberof DatepickerComponent
   */
  @ContentChild('formControlDatepicker') public datepicker: ElementRef;

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof DatepickerComponent
   */
  public controlValue: FormControl;

  /**
   * Required length
   * @description
   * @type {(number | string)}
   * @memberof DatepickerComponent
   */
  public requiredLength: number | string = null;
  /**
   * Actual length
   * @description
   * @type {(number | string)}
   * @memberof DatepickerComponent
   */
  public actualLength: number | string = null;

  /**
   * Retrieves an icon to be displayed on the right hand side of datepicker field
   * @readonly
   * @memberof DatepickerComponent
   */
  public get icon() {
    return this.options?.type === DatepickerType.Password
      ? this.type === DatepickerType.Password
        ? 'visibility'
        : 'visibility_off'
      : this.options?.icon;
  }

  /**
   * Retrieves datepicker field's type
   * @readonly
   * @memberof DatepickerComponent
   */
  public get type() {
    return this._type ?? this.options?.type;
  }

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof DatepickerComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof DatepickerComponent
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
   * Datepicker configuration options
   * @description
   * @type {DatepickerOptions}
   * @memberof DatepickerComponent
   */
  @Input() public options: DatepickerOptions;

  /**
   * Datepicker data
   * @description
   * @private
   * @type {string}
   * @memberof DatepickerComponent
   */
  private _data: string;

  /**
   * Holds datepicker field's type
   * @private
   * @type {string}
   * @memberof DatepickerComponent
   */
  private _type: string = this.options?.type;

  /**
   * Handles icon click and changes password visibility for the field
   * @memberof DatepickerComponent
   */
  public datepickerIconClicked() {
    if (this.options?.type === DatepickerType.Password) {
      this._type = this._type === DatepickerType.Password
        ? DatepickerType.Text
        : DatepickerType.Password;
    }
  }

  // ControlvalueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public writeValue(obj: any) {}

  /**
   * Registers 'fn' that will be fired when changes are made
   * @description
   * @param {(_: any) => {}} fn
   * @memberof DatepickerComponent
   */
  public registerOnChange(fn: (_: any) => {}) {
    this._propagateChange = fn;
  }

  /**
   * Handles OnKeyUp event
   * @description
   * @memberof DatepickerComponent
   */
  public onKeyUp(): void {
    const currentValue: string = this.formControl.value;

    const newValue: string = currentValue?.length > this.options.maxLength
      ? currentValue.slice(0, this.options.maxLength)
      : !this.options.pattern || this.options.pattern.test(currentValue)
        ? currentValue
        : '';

    this.formControl.patchValue(newValue);
  }

  /**
   * Validates the form, returns null when valid
   * @description
   * @param {FormControl} c
   * @returns {(ValidationErrors | null)}
   * @memberof DatepickerComponent
   */
  public validate(c: FormControl): ValidationErrors | null {
    return null;
  }

  // ControlvalueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public registerOnTouched() {
  }

  /**
   * Get value from text area and update the form
   * @description
   * @param {Event} event
   * @memberof DatepickerComponent
   */
  public onChange(event: Event) {
    this._data = (<HTMLInputElement> event.target).value;
    this._propagateChange(this._data);
  }

  /**
   * the method set in registerOnChange to emit changes back to the form
   * @description
   * @private
   * @memberof DatepickerComponent
   */
  private _propagateChange = (_: any) => {
    this.controlValue.setValue(_);
  }

  // TODO OPTICAZYTO-381 Create a common helper for UI elements to prevent duplicated code
  // TODO OPTICAZYTO-381 Move this function into the helper
  /**
   * Gets error messages
   * @description
   * @readonly
   * @memberof DatepickerComponent
   */
  public get formControlErrorMessages(): string[] {
    const controlErrorMessages: string[] = [];
    if (typeof this.formControl.errors === 'object') {
      for (const propertyName in this.formControl.errors) {
        if (this.formControl.errors.hasOwnProperty(propertyName)
          && this.formControl.touched) {
          if (propertyName === 'minlength' || propertyName === 'maxlength') {
            this.requiredLength = this.formControl.errors[propertyName]['requiredLength'];
            this.actualLength = this.formControl.errors[propertyName]['actualLength'];
          } else {
            this.actualLength = null;
            this.requiredLength = null;
          }
          controlErrorMessages.push(
            propertyName
          );
        }
      }
    } else {
      this.actualLength = null;
      this.requiredLength = null;
    }

    return controlErrorMessages;
  }

}
