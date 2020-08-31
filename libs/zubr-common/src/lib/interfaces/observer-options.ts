import { Commission, Member } from '@zubr-client/zubr-store';
import { Observable } from 'rxjs';

export interface ObserverOptions {
  /**
   * Members
   */
  members: Observable<Member[]>;
  /**
   * Commission
   */
  commission: Observable<Commission>;
}
