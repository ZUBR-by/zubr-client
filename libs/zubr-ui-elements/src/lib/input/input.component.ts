import {
  forwardRef, Component, ContentChild, ElementRef,
  EventEmitter, Input, Output,
} from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { InputOptions } from './input-options.interface';
import { InputType } from './input-type.constants';

/**
 * Input component
 * @description
 * @export
 * @class InputComponent
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
@Component({
  selector: 'zubr-client-input',
  styleUrls: [ './input.component.scss' ],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => InputComponent
      ),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(
        () => InputComponent
      ),
      multi: true,
    }],
})

/**
 * @class InputComponent
 * @description Universal Input UI
 * @package '@zubr-client/zubr-ui-elements'
 */
export class InputComponent implements ControlValueAccessor, Validator {

  /**
   * Input component's form control input
   * @description
   * @type {ElementRef}
   * @memberof InputComponent
   */
  @ContentChild('formControlInput') public input: ElementRef;

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof InputComponent
   */
  public controlValue: FormControl;

  /**
   * Required length
   * @description
   * @type {(number | string)}
   * @memberof InputComponent
   */
  public requiredLength: number | string = null;
  /**
   * Actual length
   * @description
   * @type {(number | string)}
   * @memberof InputComponent
   */
  public actualLength: number | string = null;

  /**
   * Retrieves an icon to be displayed on the right hand side of input field
   * @readonly
   * @memberof InputComponent
   */
  public get icon() {
    return this.options?.type === InputType.Password
      ? this.type === InputType.Password
        ? 'visibility'
        : 'visibility_off'
      : this.options?.icon;
  }

  /**
   * Retrieves input field's type
   * @readonly
   * @memberof InputComponent
   */
  public get type() {
    return this._type ?? this.options?.type;
  }

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof InputComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof InputComponent
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
   * Input configuration options
   * @description
   * @type {InputOptions}
   * @memberof InputComponent
   */
  @Input() public options: InputOptions;

  /**
   * Input data
   * @description
   * @private
   * @type {string}
   * @memberof InputComponent
   */
  private _data: string;

  /**
   * Holds input field's type
   * @private
   * @type {string}
   * @memberof InputComponent
   */
  private _type: string = this.options?.type;

  /**
   * Handles icon click and changes password visibility for the field
   * @memberof InputComponent
   */
  public inputIconClicked() {
    if (this.options?.type === InputType.Password) {
      this._type = this._type === InputType.Password
        ? InputType.Text
        : InputType.Password;
    }
  }

  // ControlvalueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public writeValue(obj: any) {}

  /**
   * Registers 'fn' that will be fired when changes are made
   * @description
   * @param {(_: any) => {}} fn
   * @memberof InputComponent
   */
  public registerOnChange(fn: (_: any) => {}) {
    this._propagateChange = fn;
  }

  /**
   * Handles OnKeyUp event
   * @description
   * @memberof InputComponent
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
   * @memberof InputComponent
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
   * @memberof InputComponent
   */
  public onChange(event: Event) {
    this._data = (<HTMLInputElement> event.target).value;
    this._propagateChange(this._data);
  }

  /**
   * the method set in registerOnChange to emit changes back to the form
   * @description
   * @private
   * @memberof InputComponent
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
   * @memberof InputComponent
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
