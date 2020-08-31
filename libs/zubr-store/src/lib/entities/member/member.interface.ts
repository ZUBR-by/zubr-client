import { Commission } from '../commission';
import { Organization } from '../organization';

export interface Member {
  /**
   * Entity field
   * @description
   */
  commission: Commission;
  /**
   * Entity field
   * @description
   */
  description: string;
  /**
   * Entity field
   * @description
   */
  fullName: string;
  /**
   * Entity field
   * @description
   */
  id: number;
  /**
   * Entity field
   * @description
   */
  photoUrl: string;
  /**
   * Entity field
   * @description
   */
  photoOrigin: string;
  /**
   * Entity field
   * @description
   */
  positionType: number;
  /**
   * Entity field
   * @description
   */
  region: number;
  /**
   * Entity field
   * @description
   */
  workTitle: string;
  /**
   * Referral URL
   * @description
   */
  referral: Organization;
  /**
   * Employer URL
   * @description
   */
  employer: Organization;
}
