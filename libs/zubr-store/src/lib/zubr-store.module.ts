import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityDataModule,
  EntityDataService
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  campaignReducer,
  CampaignDataService,
  CampaignEffects,
  CampaignService
} from './entities/campaign';
import {
  candidateReducer,
  CandidateDataService,
  CandidateEffects,
  CandidateService
} from './entities/candidate';
import {
  commissionReducer,
  CommissionDataService,
  CommissionEffects,
  CommissionService
} from './entities/commission';
import {
  heartbeatReducer,
  HeartbeatDataService,
  HeartbeatEffects,
  HeartbeatService
} from './entities/heartbeat';
import {
  memberReducer,
  MemberDataService,
  MemberEffects,
  MemberService
} from './entities/member';
import {
  messageReducer,
  MessageDataService,
  MessageEffects,
  MessageService
} from './entities/message';
import {
  observerReducer,
  ObserverDataService,
  ObserverEffects,
  ObserverService
} from './entities/observer';
import {
  observerRequestReducer,
  ObserverRequestDataService,
  ObserverRequestEffects,
  ObserverRequestService
} from './entities/observer-request';
import {
  organizationReducer,
  OrganizationDataService,
  OrganizationEffects,
  OrganizationService
} from './entities/organization';
import {
  placeReducer,
  PlaceDataService,
  PlaceEffects,
  PlaceService
} from './entities/place';
import {
  reportReducer,
  ReportDataService,
  ReportEffects,
  ReportService
} from './entities/report';
import {
  verifyReducer,
  VerifyDataService,
  VerifyEffects,
  VerifyService
} from './entities/verify';
import {
  authReducer,
  AuthDataService,
  AuthEffects
} from './features/auth';
import {
  bookmarkReducer,
  BookmarkEffects,
} from './features/bookmark';
import {
  pageReducer,
  PageEffects,
  PageService
} from './features/page';
import {
  campaignFeatureKey,
  candidateFeatureKey,
  commissionFeatureKey,
  entityConfig,
  heartbeatFeatureKey,
  memberFeatureKey,
  messageFeatureKey,
  metaReducers,
  observerFeatureKey,
  observerRequestFeatureKey,
  organizationFeatureKey,
  placeFeatureKey,
  reportFeatureKey,
  verifyFeatureKey, AppState
} from './zubr-store.constants';
import { ZubrStore } from './zubr-store.interface';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  bookmark: bookmarkReducer,
  campaign: campaignReducer,
  candidate: candidateReducer,
  commission: commissionReducer,
  heartbeat: heartbeatReducer,
  observer: observerReducer,
  observerRequest: observerRequestReducer,
  organization: organizationReducer,
  page: pageReducer,
  member: memberReducer,
  place: placeReducer,
  report: reportReducer,
  message: messageReducer,
  verify: verifyReducer,
};

/**
 * NgRx store module
 * @description
 * @export
 * @class ZubrStoreModule
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BookmarkEffects,
      CampaignEffects,
      CandidateEffects,
      CommissionEffects,
      HeartbeatEffects,
      MemberEffects,
      ObserverEffects,
      ObserverRequestEffects,
      OrganizationEffects,
      PageEffects,
      PlaceEffects,
      MessageEffects,
      ReportEffects,
      VerifyEffects,
    ]),
    EntityDataModule.forRoot(entityConfig),
  ],
})
export class ZubrStoreModule {
  /**
   * Store module configuration
   * @description
   * @static
   * @param {ZubrStore} config
   * @returns {ModuleWithProviders<ZubrStoreModule>}
   * @memberof ZubrStoreModule
   */
  public static forRoot(config: ZubrStore): ModuleWithProviders<ZubrStoreModule> {
    return {
      ngModule: ZubrStoreModule,
      providers: [
        {
          provide: DefaultDataServiceConfig,
          useValue: config.dataServiceConfig,
        },
        {
          provide: ZubrStore,
          useValue: config,
        },
        AuthDataService,
        BookmarkEffects,
        CampaignService,
        CampaignDataService,
        CandidateService,
        CandidateDataService,
        CommissionService,
        CommissionDataService,
        HeartbeatService,
        HeartbeatDataService,
        ObserverService,
        ObserverDataService,
        ObserverRequestService,
        ObserverRequestDataService,
        OrganizationService,
        OrganizationDataService,
        PageService,
        PageEffects,
        MemberDataService,
        MemberService,
        PlaceService,
        PlaceDataService,
        MessageService,
        MessageDataService,
        ReportService,
        ReportDataService,
        VerifyService,
        VerifyDataService,
      ],
    };
  }
  public constructor(
    private _entityDataService: EntityDataService,
    private _campaignDataService: CampaignDataService,
    private _candidateDataService: CandidateDataService,
    private _commissionDataService: CommissionDataService,
    private _memberDataService: MemberDataService,
    private _observerDataService: ObserverDataService,
    private _observerRequestDataService: ObserverRequestDataService,
    private _organizationDataService: OrganizationDataService,
    private _placeDataService: PlaceDataService,
    private _messageDataService: MessageDataService,
    private _verifyDataService: VerifyDataService,
    private _heartbeatDataService: HeartbeatDataService,
    private _reportDataService: ReportDataService
  ) {
    _entityDataService.registerService(campaignFeatureKey, _campaignDataService);
    _entityDataService.registerService(candidateFeatureKey, _candidateDataService);
    _entityDataService.registerService(commissionFeatureKey, _commissionDataService);
    _entityDataService.registerService(memberFeatureKey, _memberDataService);
    _entityDataService.registerService(observerFeatureKey, _observerDataService);
    _entityDataService.registerService(observerRequestFeatureKey, _observerRequestDataService);
    _entityDataService.registerService(organizationFeatureKey, _organizationDataService);
    _entityDataService.registerService(placeFeatureKey, _placeDataService);
    _entityDataService.registerService(messageFeatureKey, _messageDataService);
    _entityDataService.registerService(verifyFeatureKey, _verifyDataService);
    _entityDataService.registerService(heartbeatFeatureKey, _heartbeatDataService);
    _entityDataService.registerService(reportFeatureKey, _reportDataService);
  }
}
