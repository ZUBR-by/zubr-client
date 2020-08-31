import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, ErrorService, FormService } from '@zubr-client/zubr-common';
import { BadRequestError, ObserverOptions, ValueLabel } from '@zubr-client/zubr-interfaces';
import {
  selectObserverEntityError,
  AppState,
  Commission,
  Observer,
  ObserverRequest,
  ObserverRequestEntityService,
  VerifyActions
} from '@zubr-client/zubr-store';
import { SnackBarService, SNACKBAR_TYPE } from '@zubr-client/zubr-ui-elements';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../general/confirmation-dialog';

/**
 * Observer form component
 * @description
 * @export
 * @class ObserverFormComponent
 * @implements {OnChanges}
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
  selector: 'zubr-client-observer-form',
  templateUrl: './observer-form.component.html',
})
export class ObserverFormComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Pharmacy form mode
   * @description possible options: create/update
   * @type {string}
   */
  @Input() public mode: string = 'create';

  /**
   * Pharmacy entity
   * @description
   * @type {Observer}
   */
  public entity: ObserverRequest = null; // Define an entity

  /**
   * Component readiness status
   * @description
   * @type {Observable<boolean>}
   */
  public loading$: Observable<boolean>; // Entity loading state

  /**
   * Error message
   * @description
   * @type {string}
   * @memberof ObserverFormComponent
   */
  public error: string; // Generic error message if such exists
  /**
   * Observer form group
   * @description
   * @type {FormGroup}
   * @memberof ObserverFormComponent
   */
  public form: FormGroup = new FormGroup({

    firstName: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        CustomValidators.cyrillicOnly,
      ]
    ),

    middleName: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        CustomValidators.cyrillicOnly,
      ]
    ),

    lastName: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        CustomValidators.cyrillicOnly,
      ]
    ),

    phone: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]
    ),

    email: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.email,
      ]
    ),

    readyToChange: new FormControl(
      false,
      []
    ),

    observingDates: new FormControl(
      undefined,
      []
    ),

    observingDatesSel: new FormControl(
      undefined,
      [
        Validators.required,
      ]
    ),

    commissionCode: new FormControl(
      undefined,
      []
    ),

    initiative: new FormControl(
      undefined,
      [
        Validators.required,
      ]
    ),

    has18: new FormControl(
      false,
      []
    ),

  });

  /**
   * first name
   */
  public get firstName(): AbstractControl { return this.form.get('firstName'); }
  /**
   * last name
   */
  public get lastName(): AbstractControl { return this.form.get('lastName'); }
  /**
   * mobile phone
   */
  public get phone(): AbstractControl { return this.form.get('phone'); }
  /**
   * email
   */
  public get email(): AbstractControl { return this.form.get('email'); }
  /**
   * commission code
   */
  public get commissionCode(): AbstractControl { return this.form.get('commissionCode'); }
  /**
   * middle name
   */
  public get middleName(): AbstractControl { return this.form.get('middleName'); }
  /**
   * has 18
   */
  public get has18(): AbstractControl { return this.form.get('has18'); }

  /**
   * initiative
   */
  public get initiative(): AbstractControl { return this.form.get('initiative'); }

  /**
   * observing dates
   */
  public get observingDates(): AbstractControl { return this.form.get('observingDates'); }
  /**
   * observing dates sel
   */
  public get observingDatesSel(): AbstractControl { return this.form.get('observingDatesSel'); }
  /**
   * observing dates
   */
  public get readyToChange(): AbstractControl { return this.form.get('readyToChange'); }

  /**
   *  observing dates
   */
  public observingDatesSelect: ValueLabel[] = [
    {
      value: '2020-08-09',
      label: this._translateService.instant('2020_08_09'),
    },
    {
      value: '2020-08-08',
      label: this._translateService.instant('2020_08_08'),
    },
    {
      value: '2020-08-07',
      label: this._translateService.instant('2020_08_07'),
    },
    {
      value: '2020-08-06',
      label: this._translateService.instant('2020_08_06'),
    },
    {
      value: '2020-08-05',
      label: this._translateService.instant('2020_08_05'),
    },
    {
      value: '2020-08-04',
      label: this._translateService.instant('2020_08_04'),
    },
  ];
  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof ObserverFormComponent
   */
  private _stop$: Subject<void> = new Subject();

  /**
   * Creates an instance of ObserverFormComponent.
   * @memberof ObserverFormComponent
   */
  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: ObserverOptions,
    private _errorService: ErrorService,
    private _formService: FormService,
    private _snackBar: SnackBarService,
    private _observerRequestEntityService: ObserverRequestEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>
  ) { }

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof ObserverFormComponent
   */
  public ngOnInit(): void {

    this.options.commission.pipe(
      tap((commission: Commission) => this.commissionCode.setValue(commission.code)),
      takeUntil(this.dialogRef.afterClosed())
    ).subscribe();

    this.loading$ = this._observerRequestEntityService.loading$;

    // Handle all errors came from the API

    this._store$.select(selectObserverEntityError)
      .pipe(takeUntil(this._stop$))
    .subscribe((unhandledError: BadRequestError) => {
      if (unhandledError) {
        const error: string | FormGroup = this._errorService.handleError(unhandledError, this.form);
        // In case of string error show it in error div
        // otherwise errors will appear in form controls, under respective fields
        if (typeof error === 'string') {
          this._snackBar.open(error, SNACKBAR_TYPE.WARN);
        }
      }
    });
  }

  /**
   * Updates reflecting changed inputs
   * @description
   * @memberof ObserverFormComponent
   */
  public ngOnChanges(): void {

    if (this.entity) {
      this.form = this._formService.getPatchedFormGroupWithData(
        this.form, this.entity
      );
    }

  }

  /**
   * Cleanup on exit
   * @description
   * @memberof ObserverFormComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();

    // Unset entity

    this.entity = null;

    // Clear entity cache when we open this page

    this._store$.dispatch(
      VerifyActions.SetEntityErrorAction(null)
    );
    this._observerRequestEntityService.clearCache();

  }

  /**
   * Submit event handling
   * @memberof ObserverFormComponent
   */
  public submit(): void {

    // Check of form is valid, if not then show error messages under all fields

    if (this.form.valid) {

      this.observingDates.setValue(`${this.observingDatesSel.value}`);

      // Extract entity from form

      const entity: ObserverRequest = this.form.getRawValue();

      delete entity.observingDatesSel;

      // Delete previous error message if such exists

      delete this.error;

      this._observerRequestEntityService.add(entity).pipe(
        takeUntil(this._stop$)
      ).subscribe(() => {
        this.dialogRef.close();
      });

    } else {

      // Touch form to show all errors

      this._formService.markFormGroupAsTouched(this.form);

    }

  }
}
