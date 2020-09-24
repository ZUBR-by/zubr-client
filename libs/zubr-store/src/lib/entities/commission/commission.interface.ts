export interface Commission {

  code: string;

  description: string;

  id: number;

  latitude: number;

  location: string;

  longitude: number;

  name: string;

  area: string;

  type: number;

  observers: string[];

  parent: Commission;
  /**
   * Entity field
   */
  applied: number;
}
