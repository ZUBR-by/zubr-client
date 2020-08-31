export interface DataGridEntityOptions {
  /**
   * Count of records
   * @description
   * @type {number}
   * @memberof DataGridEntityOptions
   */
  count: number;
  /**
   * Current page number
   * @description
   * @type {number}
   * @memberof DataGridEntityOptions
   */
  page: number;
  /**
   * Search criteria
   * @description
   * @type {string}
   * @memberof DataGridEntityOptions
   */
  searchBy: string;
  /**
   * Search input
   * @description
   * @type {string}
   * @memberof DataGridEntityOptions
   */
  search: string;
  /**
   * Type
   * @description
   * @type {string}
   * @memberof DataGridEntityOptions
   */
  type?: string;
  /**
   * Sort criteria
   * @description
   * @type {string}
   * @memberof DataGridEntityOptions
   */
  sort?: string;
  /**
   * Sort field
   * @description
   * @type {string}
   * @memberof DataGridEntityOptions
   */
  sortBy?: string;
  /**
   * Pagination enabled
   * @description
   * @type {boolean}
   * @memberof DataGridEntityOptions
   */
  pagination?: boolean;
}
