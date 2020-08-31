export interface HeartbeatError {
  /**
   * Entity identifier
   */
  id: number;
  /**
   * An array of error messages
   */
  details: string[];
  /**
   * Generic error message
   */
  error: string;
}
