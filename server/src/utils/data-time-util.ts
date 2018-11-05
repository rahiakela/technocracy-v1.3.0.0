import * as moment from 'moment';

export class DateTimeUtils {

  /**
   * Get the expiry time from current and expired date object
   * @param currDate {Date} The current Date object.
   * @param expDate {Date} The expiry Date object.
   * @response: return the expired hours
   */
  public static getExpiredTime(currDate: Date, expDate: Date) {
    const currentDate = moment(currDate);
    const expiryDate = moment(expDate);

    return currentDate.diff(expiryDate, 'hours');
  }

  /**
   * Get the string representaion of current date object
   * @response: return the expired hours
   */
  public static getDateString() {
    return moment(new Date())
      .add(1, 'day')
      .format('LL');
  }
}
