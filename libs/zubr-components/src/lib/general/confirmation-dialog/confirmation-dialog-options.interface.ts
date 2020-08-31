export interface ConfirmationDialogOptions {
  /**
   * A title to be displayed in dialog
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  title: string;
  /**
   * Text to be displayed in dialog
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  content?: string;
  /**
   * Disable cancellation
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  disableCancellation?: boolean;
  /**
   * Disable confirmation
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  disableConfirmation?: boolean;
  /**
   * Yes button label
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  yesLabel?: string;
  /**
   * No button label
   * @type {string}
   * @memberof ConfirmationDialogOptions
   */
  noLabel?: string;
}
