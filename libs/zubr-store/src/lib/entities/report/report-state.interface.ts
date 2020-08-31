import { EntityState } from '@ngrx/entity';
import { BadRequest } from '@zubr-client/zubr-interfaces';
import { Report } from './report.interface';

export interface ReportState extends EntityState<Report> {
  /**
   * Total report count
   * @description
   * @type {number}
   * @memberof ReportState
   */
  totalCount: number;
  /**
   * Entity error
   * @description
   * @type {(BadRequest | null)}
   * @memberof ReportState
   */
  entityError: BadRequest | null;
}
