import { EntityAction, EntityActionFactory, EntityOp } from '@ngrx/data';
import { createAction, props } from '@ngrx/store';
import { BadRequest, CommonEntityActions } from '@zubr-client/zubr-interfaces';
import { placeFeatureKey } from '../../zubr-store.constants';
import { Place } from './place.interface';

/**
 * Common entity actions
 */
export const PlaceActions: CommonEntityActions = {

  SetTotalCountAction: createAction(
    `[${placeFeatureKey}] set total count of entities`, props<{
      /**
       * Action payload
       */
      payload: number;
    }>()
  ),

  SetEntityErrorAction: createAction(
    `[${placeFeatureKey}] set entity error`, props<{
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
export const PlaceDataActions: {[name: string]: EntityAction<Place>} = {

  QueryManySuccessAction: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.QUERY_MANY_SUCCESS
  ),

  QueryManyErrorAction: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.QUERY_MANY_ERROR
  ),

  SaveAddOneError: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_ADD_ONE_ERROR
  ),

  SaveAddOneSuccess: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_ADD_ONE_SUCCESS
  ),

  SaveUpdateOneError: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_ERROR
  ),

  SaveUpdateOneSuccess: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_UPDATE_ONE_SUCCESS
  ),

  SaveDeleteOneError: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_DELETE_ONE_ERROR
  ),

  SaveDeleteOneSuccess: new EntityActionFactory().create<Place>(
    placeFeatureKey,
    EntityOp.SAVE_DELETE_ONE_SUCCESS
  ),
};
