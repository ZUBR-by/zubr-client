import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { organizationFeatureKey } from '../../zubr-store.constants';
import { Organization } from './organization.interface';

/**
 * Common entity actions
 */
export const OrganizationActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${organizationFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${organizationFeatureKey}] set entity error`, props<{
      /**
       * Action payload
       */
      payload: BadRequest;
    }>()
  ),

};

/**
 * Entity data actions
 */
export const OrganizationDataActions: {[name: string]: EntityAction<Organization>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Organization>(
    organizationFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
