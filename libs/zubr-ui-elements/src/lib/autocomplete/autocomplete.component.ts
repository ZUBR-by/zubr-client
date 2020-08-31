import {
  forwardRef,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';
import { Autocomplete } from '@zubr-client/zubr-interfaces';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap
} from 'rxjs/operators';
import { AutocompleteOptions } from './autocomplete-options.interface';

export const DEBOUNCE_TIME: number = 350;

/**
 * Autocomplete component
 * @description
 * @export
 * @class AutocompleteComponent
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 * @template T
 */
@Component({
  selector: 'zubr-client-autocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})

/**
 * @class InputComponent
 * @description Autocomplete UI
 * @package '@zubr-client/zubr-ui-elements'
 */
export class AutocompleteComponent<T extends Autocomplete>
  implements ControlValueAccessor, Validator, OnInit, OnDestroy, AfterViewInit {
  /**
   * Form control input
   * @description
   * @type {ElementRef}
   * @memberof AutocompleteComponent
   */
  @ContentChild('formControlInput') public input: ElementRef;

  /**
   * Form control
   * @description
   * @type {FormControl}
   * @memberof AutocompleteComponent
   */
  public controlValue: FormControl;

  /**
   * Required input length
   * @description
   * @type {(string | number)}
   * @memberof AutocompleteComponent
   */
  public requiredLength: string | number = null;
  /**
   * Actual input length
   * @description
   * @type {(string | number)}
   * @memberof AutocompleteComponent
   */
  public actualLength: string | number = null;

  /**
   * Form control change event
   * @description
   * @type {EventEmitter<FormControl>}
   * @memberof AutocompleteComponent
   */
  @Output() public controlChange: EventEmitter<FormControl> = new EventEmitter();

  /**
   * Form control
   * @description
   * @readonly
   * @type {FormControl}
   * @memberof AutocompleteComponent
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
   * Configuration options
   * @description
   * @type {AutocompleteOptions}
   * @memberof AutocompleteComponent
   */
  @Input() public options: AutocompleteOptions<T>;

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof StationDetailPageComponent
   */
  private _stop$: Subject<void> = new Subject();
  /**
   * Actual input
   * @description
   * @private
   * @type {string}
   * @memberof AutocompleteComponent
   */
  private _data: string;

  /**
   * Initial subsription setup
   * @description
   * @memberof AutocompleteComponent
   */
  public ngOnInit() {
    // Load data source based on initial options
    this.loadDataSource();
  }

  /**
   * Complete the subscriptions on exit
   * @description
   * @memberof StationDetailPageComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  /**
   * Value change subsription logic
   * @description
   * @memberof AutocompleteComponent
   */
  public ngAfterViewInit() {
    // Server-side search

    this.controlValue.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(val => {
          this.options.entityOptions = {
            ...this.options.entityOptions,
            search: val,
          };

          this.loadDataSource();
        }),
        takeUntil(this._stop$)
      )
      .subscribe();
    // On sort or paginate events, load a new page
  }

  /**
   * Data source subscription
   * @description
   * @memberof AutocompleteComponent
   */
  public loadDataSource(): void {
    // Update data source

    this.options.dataSource
      .load(this.options.entityOptions)
      .pipe(takeUntil(this._stop$))
      .subscribe();
  }

  // ControlValueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public writeValue(obj: any) {}

  /**
   * Registers 'fn' that will be fired when changes are made
   * @description
   * @param {predicate} fn
   * @memberof AutocompleteComponent
   */
  public registerOnChange(fn: (_: any) => {}) {
    this._propagateChange = fn;
  }

  // validates the form, returns null when valid else the
  // validation object in this case we're checking if the json
  // parsing has passed or failed from the onChange method
  // tslint:disable-next-line: completed-docs
  public validate(c: FormControl) {
    return null;
  }

  // ControlValueAccessor side-effect
  // tslint:disable-next-line: completed-docs
  public registerOnTouched() {}

  /**
   * Get value from text area and update the form
   * @description
   * @param {*} event
   * @memberof AutocompleteComponent
   */
  public onChange(event: any) {
    this._data = event.target.value;
    this._propagateChange(this._data);
  }

  /**
   * the method set in registerOnChange to emit changes back to the form
   * @description
   * @private
   * @memberof AutocompleteComponent
   */
  private _propagateChange = (_: any) => {
    this.controlValue.setValue(_);
  }

  /**
   * Retrieves error messages
   * @description
   * @readonly
   * @memberof AutocompleteComponent
   */
  public get formControlErrorMessages(): string[] {
    const controlErrorMessages: string[] = [];
    if (typeof this.formControl.errors === 'object') {
      for (const propertyName in this.formControl.errors) {
        if (this.formControl.errors.hasOwnProperty(propertyName) && this.formControl.touched) {
          if (propertyName === 'minlength' || propertyName === 'maxlength') {
            this.requiredLength = this.formControl.errors[propertyName]['requiredLength'];
            this.actualLength = this.formControl.errors[propertyName]['actualLength'];
          } else {
            this.actualLength = null;
            this.requiredLength = null;
          }
          controlErrorMessages.push(propertyName);
        }
      }
    } else {
      this.actualLength = null;
      this.requiredLength = null;
    }

    return controlErrorMessages;
  }
}
