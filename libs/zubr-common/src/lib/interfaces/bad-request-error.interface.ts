import { ErrorMessage } from './error-message.interface';

export interface BadRequestError {
    /**
     * Error message object for field-specific messages
     * Or a general error message
     * @type {(ErrorMessage | string)}
     * @memberof BadRequestError
     */
    message: ErrorMessage | string;
}
