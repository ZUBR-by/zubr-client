export interface BadRequest {
  /**
   * Validation error list
   * @description
   * @type {[]}
   * @memberof BadRequest
   */
  validationErrors?: [];
  /**
   * Request ID
   * @description
   * @type {string}
   * @memberof BadRequest
   */
  id: string;
  /**
   * Bad request message
   * @description
   * @type {string}
   * @memberof BadRequest
   */
  message: string;
  /**
   * HTTP status code
   * @description
   * @type {number}
   * @memberof BadRequest
   */
  status: number;
  /**
   * Any other errors
   * @description
   * @type {[]}
   * @memberof BadRequest
   */
  errors?: [];
  /**
   * Updated
   * @description
   * @type {number}
   * @memberof CsvImportResponse
   */
  updated?: number;
  /**
   * Created
   * @description
   * @type {number}
   * @memberof CsvImportResponse
   */
  created?: number;
}
