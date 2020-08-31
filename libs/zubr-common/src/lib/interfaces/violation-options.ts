import { Commission, Member } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';

export interface ViolationOptions {
  /**
   * Members
   */
  members: Observable<Member[]>;
  /**
   * Commission
   */
  commission: Observable<Commission>;
}
