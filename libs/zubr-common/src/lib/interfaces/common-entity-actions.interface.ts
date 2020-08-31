import { ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';

export interface CommonEntityActions {
  /**
   * Set total count of entities action
   */
  SetTotalCountAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Set entity error action
   */
  SetEntityErrorAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
}
