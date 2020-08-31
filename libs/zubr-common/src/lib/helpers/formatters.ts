/**
 * Formatters
 */
export class Formatters {
  /**
   * To digits
   * @param d
   */
  public static twoDigits(d: any): any {
    if (d >= 0 && d < 10) {
      return `0${d.toString()}`;
    }
    if (d > -10 && d < 0) {
      return `-0${(d * -1).toString()}`;
    }

    return d.toString();
  }

  /**
   * to MysqlFormat
   */
  public static toMysqlFormat(date: Date) {

    return `${date.getUTCFullYear()}-${this.twoDigits(date.getUTCMonth() + 1)}-${this.twoDigits(date.getUTCDate())} ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getUTCMinutes())}:${this.twoDigits(date.getUTCSeconds())}`;
  }
}
