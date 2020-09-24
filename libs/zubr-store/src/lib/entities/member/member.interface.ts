import { Commission } from '../commission';
import { Organization } from '../organization';

export interface Member {

  commission: Commission;

  description: string;

  fullName: string;

  id: number;

  photoUrl: string;

  photoOrigin: string;

  positionType: number;

  region: number;

  workTitle: string;
  referral: Organization;

  employer: Organization;

  tags: string[];
}
