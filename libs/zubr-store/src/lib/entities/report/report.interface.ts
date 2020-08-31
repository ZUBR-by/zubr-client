export interface Report {
  /**
   * Entity field
   */
  commissionCode: string;
  /**
   * Entity field
   */
  numberVotersFromProtocol: number;
  /**
   * Entity field
   */
  numberVotersFromObserver: number;
  /**
   * Entity field
   */
  day: string;
  /**
   * Entity field
   */
  attachments: string[];
  /**
   * Entity field
   */
  observerUid: string;
  /**
   * Entity field
   */
  totalVotersCount: number;
  /**
   * Entity field
   */
  votersReceivedBallotsCount: number;
  /**
   * Entity field
   */
  upfrontVotersCount: number;
  /**
   * Entity field
   */
  homeVotersCount: number;
  /**
   * Entity field
   */
  stationVotersCount: number;
  /**
   * Entity field
   */
  droppedOutVotersCount: number;
  /**
   * Entity field
   */
  ballotsCount: number;
  /**
   * Entity field
   */
  filledBallotsCount: number;
  /**
   * Entity field
   */
  damagedBallotsCount: number;
  /**
   * Entity field
   */
  unusedBallotsCount: number;
  /**
   * Entity field
   */
  votesCountDmitriev: number;
  /**
   * Entity field
   */
  votesCountKonopatskaya: number;
  /**
   * Entity field
   */
  votesCountLukashenko: number;
  /**
   * Entity field
   */
  votesCountTihanovskaya: number;
  /**
   * Entity field
   */
  votesCountCherechen: number;
  /**
   * Entity field
   */
  votesCountAgainsAll: number;
}
