import {
  forwardRef, Component, ContentChild, ElementRef,
  EventEmitter, Input, Output,
} from '@angular/core';
import {
  ControlValueAccessor, FormControl,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { TextareaOptions } from './textarea-options.interface';
import { TextareaType } from './textarea-type.constants';

/**
 * Textarea component
 * @description
 * @export
 * @class TextareaComponent
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
@Component({
  selector: 'zubr-client-textarea',
  styleUrls: [ './textarea.component.scss' ],
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => TextareaComponent
      ),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(
        () => TextareaComponent
      ),
      multi: true,
    }],
})

/**
 * @class TextareaComponent
 * @description Universal Textarea UI
 * @package '@zubr-client/zubr-ui-elements'
 */
export class TextareaComponent implements ControlValueAccessor, Validator {

  /**
   * Textarea component's form control textarea
   * @description
   * @type {ElementRef}
   * @memberof TextareaComponent
   */
  @ContentChild('formControlTextarea') public textarea: ElementRef;

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof TextareaComponent
   */
  public controlValue: FormControl;

  /**
   * Required length
   * @description
   * @type {(number | string)}
   * @memberof TextareaComponent
   */
  public requiredLength: number | string = null;
  /**
   * Actual length
   * @description
   * @type {(number | string)}
   * @memberof TextareaComponent
   */
  public actualLength: number | string = null;

  /**
   * Retrieves an icon to be displayed on the right hand side of textarea field
   * @readonly
   * @memberof TextareaComponent
   */
  public get icon() {
    return this.options?.type === TextareaType.Password
      ? this.type === TextareaType.Password
        ? 'visibility'
        : 'visibility_off'
      : this.options?.icon;
  }

  /**
   * Retrieves textarea field's type
   * @readonly
   * @memberof TextareaComponent
   */
  public get type() {
    return this._type ?? this.options?.type;
  }

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof TextareaComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof TextareaComponent
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
   * Textarea configuration options
   * @description
   * @type {TextareaOptions}
   * @memberof TextareaComponent
   */
  @Input() public options: TextareaOptions;

  /**
   * Textarea data
   * @description
   * @private
   * @type {string}
   * @memberof TextareaComponent
   */
  private _data: string;

  /**
   * Holds textarea field's type
   * @private
   * @type {string}
   * @memberof TextareaComponent
   */
  private _type: string = this.options?.type;

  /**
   * Handles icon click and changes password visibility for the field
   * @memberof TextareaComponent
   */
  public textareaIconClicked() {
    if (this.options?.type === TextareaType.Password) {
      this._type = this._type === TextareaType.Password
        ? TextareaType.Text
        : TextareaType.Password;
    }
  }

  // ControlvalueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public writeValue(obj: any) {}

  /**
   * Registers 'fn' that will be fired when changes are made
   * @description
   * @param {(_: any) => {}} fn
   * @memberof TextareaComponent
   */
  public registerOnChange(fn: (_: any) => {}) {
    this._propagateChange = fn;
  }

  /**
   * Handles OnKeyUp event
   * @description
   * @memberof TextareaComponent
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
   * @memberof TextareaComponent
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
   * @memberof TextareaComponent
   */
  public onChange(event: Event) {
    this._data = (<HTMLInputElement> event.target).value;
    this._propagateChange(this._data);
  }

  /**
   * the method set in registerOnChange to emit changes back to the form
   * @description
   * @private
   * @memberof TextareaComponent
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
   * @memberof TextareaComponent
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
