export interface Commission {
  /**
   * Entity field
   * @description
   */
  code: string;
  /**
   * Entity field
   * @description
   */
  description: string;
  /**
   * Entity field
   * @description
   */
  id: number;
  /**
   * Entity field
   * @description
   */
  latitude: number;
  /**
   * Entity field
   * @description
   */
  location: string;
  /**
   * Entity field
   * @description
   */
  longitude: number;
  /**
   * Entity field
   * @description
   */
  name: string;
  /**
   * Entity field
   * @description
   */
  area: string;
  /**
   * Entity field
   * @description
   */
  type: number;
  /**
   * Entity field
   * @description
   */
  observers: string[];
  /**
   * Entity field
   * @description
   */
  parent: Commission;
  /**
   * Entity field
   */
  applied: number;
}
