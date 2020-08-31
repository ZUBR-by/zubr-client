import { ActionCreator } from '@ngrx/store';
import { FunctionWithParametersType } from '@ngrx/store/src/models';

export interface PageActions {
  /**
   * Change page tab action
   */
  ChangePageTabAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Close page tab action
   */
  ClosePageTabAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Page tab changed action
   */
  PageTabChangedAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Update page tab action
   */
  UpdatePageTabAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Page tabs limit exceed action
   */
  PageTabsLimitExceededAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
  /**
   * Change page tab request action
   */
  ChangePageTabRequestAction: ActionCreator<string, FunctionWithParametersType<any[], any>>;
}
