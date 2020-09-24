export interface ObserverRequest {

  id: number;

  timestamp: string;
  /**
   * Observer dates select
   */
  observingDatesSel: string[];

  readyToChange: boolean;

  email: string;

  commissionCode: string;

  has18: boolean;

  observingDates: string;

  lastName: string;

  firstName: string;

  middleName: string;

  phone: string;

  alreadyParticipated: boolean;

  helpManagement: boolean;

  fromCandidatesGroup: string;

  observingBefore: string;

  helpSuggestion: string;

  initiative: number;
}
