import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, ErrorService, FormService } from '@zubr-client/zubr-common';
import {
  selectVerifyEntityError,
  AppState,
  Verify,
  VerifyActions, VerifyEntityService, VerifyError
} from '@zubr-client/zubr-store';
import { SnackBarService } from '@zubr-client/zubr-ui-elements';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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
  selector: 'zubr-client-verify-form',
  templateUrl: './verify-form.component.html',
})
export class VerifyFormComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Pharmacy form mode
   * @description possible options: create/update
   * @type {string}
   */
  @Input() public mode: string = 'create';

  /**
   * Entity
   * @description
   * @type {Verify}
   */
  public entity: Verify = null; // Define an entity

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
   * Success mode
   * @description
   * @type {boolean}
   * @memberof ObserverFormComponent
   */
  public successMode: boolean = false; // Display form in success mode
  /**
   * Form
   * @description
   * @type {FormGroup}
   * @memberof VerifyFormComponent
   */
  public form: FormGroup = new FormGroup({

    id: new FormControl(1),

    phoneTail: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        CustomValidators.digitsOnly,
      ]
    ),

    observerId: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]
    ),

    hasSignatures: new FormControl(
      false,
      []
    ),
    approvedObserver: new FormControl(
      false,
      []
    ),

  });

  /**
   * Phone tail getter
   */
  public get phoneTail(): AbstractControl { return this.form.get('phoneTail'); }
  /**
   * Observer ID getter
   */
  public get observerId(): AbstractControl { return this.form.get('observerId'); }
  /**
   * Has signature getter
   */
  public get hasSignatures(): AbstractControl { return this.form.get('hasSignatures'); }
  /**
   * Approved observer getter
   */
  public get approvedObserver(): AbstractControl { return this.form.get('approvedObserver'); }

  /**
   *  observing dates
   */
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
    private _errorService: ErrorService,
    private _formService: FormService,
    private _snackBar: SnackBarService,
    private _verifyEntityService: VerifyEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>
  ) { }

  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof ObserverFormComponent
   */
  public ngOnInit(): void {

    this.loading$ = this._verifyEntityService.loading$;

    this._store$.select(selectVerifyEntityError)
      .pipe(takeUntil(this._stop$))
    .subscribe((entityError: VerifyError) => {
      if (entityError) {
        this.error = entityError.error ? entityError.error : 'error_occurred';
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
   * On Destroy
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
    this._verifyEntityService.clearCache();

  }

  /**
   * Submit
   * @memberof ObserverFormComponent
   */
  public submit(): void {

    if (this.form.valid) {

      const entity: Verify = this.form.getRawValue();

      delete this.error;

      this._verifyEntityService.add(entity).pipe(
        tap(() => {
          this.successMode = true;
        }),
        takeUntil(this._stop$)
      ).subscribe();
    } else {

      // Touch form to show all errors

      this._formService.markFormGroupAsTouched(this.form);

    }

  }

  /**
   * Navigate to platform
   */
  public navigateToPlatform(): void {
    window.location.href = 'https://zubr.in/elections';
  }
}
