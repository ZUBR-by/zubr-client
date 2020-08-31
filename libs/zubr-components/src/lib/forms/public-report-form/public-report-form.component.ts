import { HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, ErrorService, Formatters, FormService } from '@zubr-client/zubr-common';
import { BadRequestError, ValueLabel } from '@zubr-client/zubr-interfaces';
import {
  selectReportEntityError,
  AppState,
  Commission,
  Report,
  ReportActions,
  ReportEntityService,
  VerifyEntityService
} from '@zubr-client/zubr-store';
import { SnackBarService, SNACKBAR_TYPE } from '@zubr-client/zubr-ui-elements';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { Observable, Subject } from 'rxjs';
import { debounceTime, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../general/confirmation-dialog';

/**
 * Report form component
 * @description
 * @export
 * @class ReportFormComponent
 * @implements {OnChanges}
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
  selector: 'zubr-client-public-report-form',
  templateUrl: './public-report-form.component.html',
})
export class PublicReportFormComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * form mode
   * @description possible options: create/update
   * @type {string}
   */
  @Input() public mode: string = 'create';

  /**
   * Pharmacy entity
   * @description
   * @type {Report}
   */
  public entity: Report = null; // Define an entity

  /**
   * Component readiness status
   * @description
   * @type {Observable<boolean>}
   */
  public loading$: Observable<boolean>; // Entity loading state

  /**
   * Error report
   * @description
   * @type {string}
   * @memberof ReportFormComponent
   */
  public error: string; // Generic error report if such exists

  /**
   * Verification status
   */
  public status: string = 'unverified';

  /**
   * Is verified
   */
  public isVerified: boolean = false;

  /**
   * Commission
   */
  public commission: Commission = null;

  /**
   *  observing dates
   */
  public observingDatesSelect: ValueLabel[] = [
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
   * Possible members
   * @description
   * @type {ValueLabel[]}
   */
  public selectMembers: ValueLabel[] = [];
  /**
   * Verification form
   * @description
   * @type {FormGroup}
   * @memberof VerifyFormComponent
   */
  public verificationForm: FormGroup = new FormGroup({

    commission: new FormControl(
      undefined,
      []
    ),

    phone: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        CustomValidators.digitsOnly,
      ]
    ),

    uid: new FormControl(
      undefined,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]
    ),

  });
  /**
   * Report form group
   * @description
   * @type {FormGroup}
   * @memberof ReportFormComponent
   */
  public form: FormGroup = new FormGroup({

    attachments: new FormControl([]),
    commissionCode: new FormControl(''),
    observerUid: new FormControl(''),
    numberVotersFromObserver: new FormControl(0),
    numberVotersFromProtocol: new FormControl(0),
    day: new FormControl('2020-08-09'),
    fromOutside: new FormControl(false),

  });

  /**
   * Uploader
   */
  @ViewChild('uploaderComponent')
  public fileUpload: AngularFileUploaderComponent;

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof ReportFormComponent
   */
  private _stop$: Subject<void> = new Subject();

  /**
   * Creates an instance of ReportFormComponent.
   * @memberof ReportFormComponent
   */
  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: any,
    private _dialog: MatDialog,
    private _errorService: ErrorService,
    private _formService: FormService,
    private _snackBar: SnackBarService,
    private _reportEntityService: ReportEntityService,
    private _verifyEntityService: VerifyEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>
  ) { }

  /**
   * Verify observer
   */
  public verify(): void {
    if (this.verificationForm.valid) {
      this.verificationForm.get('commission').setValue(this.commission.code);
      this.form.get('commissionCode').setValue(this.commission.code);
      this._verifyEntityService.verify(this.verificationForm.getRawValue()).pipe(
        tap(verificationResponse => {
          this.status = `observer_${verificationResponse.status}`;
          if (verificationResponse.status === 'ok') {
            this.isVerified = true;
            this.form.get('observerUid').setValue(this.verificationForm.get('uid').value);
          }
        }),
        first()
      ).subscribe();
    }
  }
  /**
   * Initialize entry data and subscriptions
   * @description
   * @memberof ReportFormComponent
   */
  public ngOnInit(): void {

    this.verificationForm.get('uid').valueChanges.pipe(
      debounceTime(100),
      tap(() => this.verify()),
      takeUntil(this._stop$)
    ).subscribe();

    this.verificationForm.get('phone').valueChanges.pipe(
      debounceTime(100),
      tap(() => this.verify()),
      takeUntil(this._stop$)
    ).subscribe();

    this.options.members.pipe(
      takeUntil(this._stop$)
    ).subscribe(members => {
        members.forEach(member => {
            this.selectMembers.push({
              value: member.id.toString(),
              label: member.fullName,
            });
          }
        );
      }
    );

    this.options.commission.pipe(
      takeUntil(this._stop$)
    ).subscribe(commission => {
      this.commission = commission;
      this.form.get('commissionCode').setValue(this.commission.code);
    });

    this.loading$ = this._reportEntityService.loading$;

    // Handle all errors came from the API

    this._store$.select(selectReportEntityError)
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
   * @memberof ReportFormComponent
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
   * @memberof ReportFormComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();

    // Unset entity

    this.entity = null;

    // Clear entity cache when we open this page

    this._store$.dispatch(
      ReportActions.SetEntityErrorAction(null)
    );
    this._reportEntityService.clearCache();

  }

  /**
   * Submit event handling
   * @memberof ReportFormComponent
   */
  public submit(): void {

    // Check of form is valid, if not then show error reports under all fields

    if (this.form.valid) {

      // Extract entity from form

      const entity: Report = this.form.getRawValue();

      entity.numberVotersFromObserver = +entity.numberVotersFromObserver;
      entity.numberVotersFromProtocol = +entity.numberVotersFromProtocol;

      // Delete previous error report if such exists

      delete this.error;

      this.fileUpload.uploadFiles();
      this.fileUpload.ApiResponse.pipe(
        switchMap(response => {
          if (response instanceof HttpResponse) {
            entity.attachments = response.body;
          }

          return this._reportEntityService.add(entity);
        }),
        map(() => this.dialogRef.close()),
        takeUntil(this._stop$)
      ).subscribe();

    } else {

      // Touch form to show all errors

      this._formService.markFormGroupAsTouched(this.form);

    }

  }
}
