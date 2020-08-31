import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  AuthState,
  MessageState,
  ObserverState,
  PageState,
  Place, ReportState,
  VerifyState
} from '.';
import { CampaignState } from './entities/campaign';
import { CandidateState } from './entities/candidate';
import { CommissionState } from './entities/commission';
import { HeartbeatState } from './entities/heartbeat';
import { MemberState } from './entities/member';
import { OrganizationState } from './entities/organization';
import { PlaceState } from './entities/place';
import { BookmarkState } from './features/bookmark';

export const authFeatureKey: string = 'auth';
export const bookmarkFeatureKey: string = 'bookmark';
export const campaignFeatureKey: string = 'campaign';
export const candidateFeatureKey: string = 'candidate';
export const commissionFeatureKey: string = 'commission';
export const heartbeatFeatureKey: string = 'heartbeat';
export const memberFeatureKey: string = 'member';
export const organizationFeatureKey: string = 'organization';
export const observerFeatureKey: string = 'observer';
export const observerRequestFeatureKey: string = 'observerRequest';
export const verifyFeatureKey: string = 'verify';
export const pageFeatureKey: string = 'page';
export const placeFeatureKey: string = 'place';
export const reportFeatureKey: string = 'report';
export const messageFeatureKey: string = 'message';

export interface AppState {
  /**
   * Auth state
   * @description
   * @type {AuthState}
   * @memberof AppState
   */
  auth: AuthState;
  /**
   * Bookmark state
   * @description
   * @type {BookmarkState}
   * @memberof AppState
   */
  bookmark: BookmarkState;
  /**
   * Campaign state
   * @description
   * @type {CampaignState}
   * @memberof AppState
   */
  campaign: CampaignState;
  /**
   * Candidate state
   * @description
   * @type {CandidateState}
   * @memberof AppState
   */
  candidate: CandidateState;
  /**
   * Commission state
   * @description
   * @type {CommissionState}
   * @memberof AppState
   */
  commission: CommissionState;
  /**
   * Heartbeat state
   * @description
   * @type {HeartbeatState}
   * @memberof AppState
   */
  heartbeat: HeartbeatState;
  /**
   * Member state
   * @description
   * @type {MemberState}
   * @memberof AppState
   */
  member: MemberState;
  /**
   * Organization state
   * @description
   * @type {OrganizationState}
   * @memberof AppState
   */
  organization: OrganizationState;
  /**
   * Page state
   * @description
   * @type {PageState}
   * @memberof AppState
   */
  page: PageState;
  /**
   * Observer state
   * @description
   * @type {ObserverState}
   * @memberof AppState
   */
  observer: ObserverState;
  /**
   * Observer request state
   * @description
   * @type {ObserverState}
   * @memberof AppState
   */
  observerRequest: ObserverState;
  /**
   * Member state
   * @description
   * @type {PlaceState}
   * @memberof AppState
   */
  place: PlaceState;
  /**
   * Report state
   * @description
   * @type {PlaceState}
   * @memberof AppState
   */
  report: ReportState;
  /**
   * Verify state
   * @description
   * @type {MessageState}
   * @memberof AppState
   */
  verify: VerifyState;
  /**
   * Message state
   * @description
   * @type {MessageState}
   * @memberof AppState
   */
  message: MessageState;
}

export const entityMetadata: EntityMetadataMap = {
  campaign: {},
  candidate: {},
  commission: {},
  heartbeat: {},
  member: {},
  organization: {},
  observer: {},
  observerRequest: {},
  place: {
    selectId: (place: Place) =>  place.place_id,
  },
  message: {},
  report: {},
  verify: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};

/**
 * Local storage sync
 * @description
 * @export
 * @template T
 * @template V
 * @param {ActionReducer<T, V>} reducer
 * @returns {ActionReducer<T, V>}
 */
export function localStorageSyncReducer<T, V extends Action>(
  reducer: ActionReducer<T, V>
): ActionReducer<T, V> {
  return localStorageSync({
    keys: [pageFeatureKey, authFeatureKey, bookmarkFeatureKey],
  })(reducer);
}

export const metaReducers: MetaReducer<AppState, Action>[] = [
  localStorageSyncReducer,
];
