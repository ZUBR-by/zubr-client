export interface EntityHttpResponse<T> {
  /**
   * List of entities
   * @description
   * @type {T[]}
   * @memberof EntityHttpResponse
   */
  content: T[];
  /**
   * Paging data
   * @description
   * @type {{
   *     sort: {
   *       sorted: boolean;
   *       unsorted: boolean;
   *     };
   *     pageSize: number;
   *     pageNumber: number;
   *     offset: number;
   *     paged: boolean;
   *     unpaged: boolean;
   *   }}
   * @memberof InsuranceHttpResponse
   */
  pageable: {
    /**
     * Sort information
     * @description
     * @type {{
     *       sorted: boolean;
     *       unsorted: boolean;
     *     }}
     */
    sort: {
      /**
       * Sorted flag
       * @description
       * @type {boolean}
       */
      sorted: boolean;
      /**
       * Not sorted flag
       * @description
       * @type {boolean}
       */
      unsorted: boolean;
    };
    /**
     * Current page size
     * @description
     * @type {number}
     */
    pageSize: number;
    /**
     * Current page number
     * @description
     * @type {number}
     */
    pageNumber: number;
    /**
     * Page offset
     * @description
     * @type {number}
     */
    offset: number;
    /**
     * Paged flag
     * @description
     * @type {boolean}
     */
    paged: boolean;
    /**
     * Unpaged flag
     * @description
     * @type {boolean}
     */
    unpaged: boolean;
  };
  /**
   * Total available pages
   * @description
   * @type {number}
   * @memberof InsuranceHttpResponse
   */
  totalPages: number;
  /**
   * Total available elements
   * @description
   * @type {number}
   * @memberof InsuranceHttpResponse
   */
  totalElements: number;
  /**
   * Last page flag
   * @description
   * @type {boolean}
   * @memberof InsuranceHttpResponse
   */
  last: boolean;
  /**
   * First page flag
   * @description
   * @type {boolean}
   * @memberof InsuranceHttpResponse
   */
  first: boolean;
  /**
   * Sort information
   * @description
   * @type {{
   *     sorted: boolean;
   *     unsorted: boolean;
   *   }}
   * @memberof InsuranceHttpResponse
   */
  sort: {
    /**
     * Sorted flag
     * @description
     * @type {boolean}
     */
    sorted: boolean;
    /**
     * Not sorted flag
     * @description
     * @type {boolean}
     */
    unsorted: boolean;
  };
  /**
   * Current number of elements returned
   * @description
   * @type {number}
   * @memberof InsuranceHttpResponse
   */
  numberOfElements: number;
  /**
   * Current page size
   * @description
   * @type {number}
   * @memberof InsuranceHttpResponse
   */
  size: number;
  /**
   * Current page number
   * @description
   * @type {number}
   * @memberof InsuranceHttpResponse
   */
  number: number;
}
