import { HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, ErrorService, Formatters, FormService } from '@zubr-client/zubr-common';
import { BadRequestError, ValueLabel } from '@zubr-client/zubr-interfaces';
import {
  selectMessageEntityError,
  AppState,
  Commission,
  Message,
  MessageActions,
  MessageEntityService,
  VerifyEntityService
} from '@zubr-client/zubr-store';
import { SnackBarService, SNACKBAR_TYPE } from '@zubr-client/zubr-ui-elements';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { Observable, Subject } from 'rxjs';
import { debounceTime, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../general/confirmation-dialog';

/**
 * Message form component
 * @description
 * @export
 * @class MessageFormComponent
 * @implements {OnChanges}
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
  selector: 'zubr-client-message-form',
  templateUrl: './message-form.component.html',
})
export class MessageFormComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * form mode
   * @description possible options: create/update
   * @type {string}
   */
  @Input() public mode: string = 'create';

  /**
   * Pharmacy entity
   * @description
   * @type {Message}
   */
  public entity: Message = null; // Define an entity

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
   * @memberof MessageFormComponent
   */
  public error: string; // Generic error message if such exists

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
   * Possible messages
   * @description
   * @type {ValueLabel[]}
   */
  public selectMessage: ValueLabel[] = [
    { value: 0, label: this._translateService.instant('violation_type_0') },
    { value: 1, label: this._translateService.instant('violation_type_1') },
    { value: 2, label: this._translateService.instant('violation_type_2') },
    { value: 3, label: this._translateService.instant('violation_type_3') },
    { value: 4, label: this._translateService.instant('violation_type_4') },
    { value: 5, label: this._translateService.instant('violation_type_5') },
    { value: 6, label: this._translateService.instant('violation_type_6') },
    { value: 7, label: this._translateService.instant('violation_type_7') },
    { value: 8, label: this._translateService.instant('violation_type_8') },
    { value: 9, label: this._translateService.instant('violation_type_9') },
    { value: 10, label: this._translateService.instant('violation_type_10') },
    { value: 11, label: this._translateService.instant('violation_type_11') },
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
   * Message form group
   * @description
   * @type {FormGroup}
   * @memberof MessageFormComponent
   */
  public form: FormGroup = new FormGroup({

    attachments: new FormControl([]),
    categories: new FormControl([]),
    member: new FormControl(''),
    description: new FormControl('', [
      Validators.max(6000),
      Validators.maxLength(6000),
    ]),
    commissionCode: new FormControl(''),
    observerUid: new FormControl(''),
    createdAt: new FormControl(new Date()),
    fromOutside: new FormControl(false),

  });

  /**
   * Uploader
   */
  @ViewChild('uploaderComponent')
  private fileUpload: AngularFileUploaderComponent;

  /**
   * Subscription termination property
   * @description
   * @private
   * @type {Subject<void>}
   * @memberof MessageFormComponent
   */
  private _stop$: Subject<void> = new Subject();

  /**
   * Creates an instance of MessageFormComponent.
   * @memberof MessageFormComponent
   */
  public constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public options: any,
    private _dialog: MatDialog,
    private _errorService: ErrorService,
    private _formService: FormService,
    private _snackBar: SnackBarService,
    private _messageEntityService: MessageEntityService,
    private _verifyEntityService: VerifyEntityService,
    private _translateService: TranslateService,
    private _store$: Store<AppState>
  ) { }

  /**
   * Verify observer
   */
  public verify(): void {
    if (this.verificationForm.valid) {
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
   * @memberof MessageFormComponent
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
      this.verificationForm.get('commission').setValue(this.commission.code);
      this.form.get('commissionCode').setValue(this.commission.code);
    });

    this.loading$ = this._messageEntityService.loading$;

    // Handle all errors came from the API

    this._store$.select(selectMessageEntityError)
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
   * @memberof MessageFormComponent
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
   * @memberof MessageFormComponent
   */
  public ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();

    // Unset entity

    this.entity = null;

    // Clear entity cache when we open this page

    this._store$.dispatch(
      MessageActions.SetEntityErrorAction(null)
    );
    this._messageEntityService.clearCache();

  }

  /**
   * Submit event handling
   * @memberof MessageFormComponent
   */
  public submit(): void {

    // Check of form is valid, if not then show error messages under all fields

    if (this.form.valid) {

      // Extract entity from form

      const entity: Message = this.form.getRawValue();

      entity.createdAt = Formatters.toMysqlFormat(new Date(entity.createdAt));

      // Delete previous error message if such exists

      delete this.error;

      this.fileUpload.uploadFiles();
      this.fileUpload.ApiResponse.pipe(
        switchMap(response => {
          if (response instanceof HttpResponse) {
            entity.attachments = response.body;
          }

          return this._messageEntityService.add(entity);
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
