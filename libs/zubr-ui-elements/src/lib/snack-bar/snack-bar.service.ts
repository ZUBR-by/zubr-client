import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export enum SNACKBAR_TYPE {
  WARN = 'snackbar-alert',
}

/**
 * SnackBarService is a service for displaying snack-bar notifications.
 * @export
 * @class SnackBarService
 */
@Injectable()
export class SnackBarService {

  public constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  /**
   * Main method that opens snack bar
   * @param {string} message - a translatable message
   * @param {SNACKBAR_TYPE} [snackbarType] - optional parameter. Used to indicate WARN type
   * @memberof SnackBarService
   */
  public open(message: string, snackbarType?: SNACKBAR_TYPE): void {
    const translatedMessage: string = this._translateService.instant(message);
    const configOptions: MatSnackBarConfig = !!snackbarType
      ? { panelClass: snackbarType }
      : null;

    this._snackBar.open(translatedMessage, null, configOptions);
  }
}
