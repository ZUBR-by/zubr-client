export interface CsvImportResponse {
  /**
   * Import error list
   * @description
   * @type {{
   *     message: string;
   *   }[]}
   * @memberof CsvImportResponse
   */
  errors?: {
    /**
     * Import error message
     * @description
     * @type {string}
     */
    message: string;
  }[];
  /**
   * Number of created records
   * @description
   * @type {number}
   * @memberof CsvImportResponse
   */
  created?: number;
  /**
   * Number of updated records
   * @description
   * @type {number}
   * @memberof CsvImportResponse
   */
  updated?: number;
  /**
   * Import error message
   * @description
   * @type {string}
   */
  message?: string;
}
