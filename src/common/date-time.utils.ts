/* eslint-disable import/no-anonymous-default-export */
import dayjs, { ManipulateType } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

export class DateTimeUtils {
  static tz = "Asia/Dhaka";

  /**
   * Get the current time in a specific format and timezone
   */
  static now = (format = "HH:mm:ss", tz = this.tz): string => {
    const d = dayjs().tz(tz);
    return d.format(format);
  };
  /**
   * Get the current date in a specific format and timezone
   */
  static today = (format = "DD/MM/YYYY HH:mm A", tz = this.tz): string => {
    const d = dayjs().tz(tz);
    return d.format(format);
  };

  /**
   * Format a date in a specific format and timezone
   */
  static formatDate = (
    date: string | Date | number,
    format = "DD/MM/YYYY",
    tz = this.tz,
  ): string => {
    if (!date) return "";

    const d = dayjs(date).tz(tz);
    return d.format(format);
  };
  static created = (
    date: string | Date | number,
    format = "DD/MM/YYYY H:mm A",
    tz = this.tz,
  ): string => {
    if (!date) return "";

    const d = dayjs(date).tz(tz);
    return d.format(format);
  };

  /**
   * Get current time in ISO or custom format
   */
  static getNow = (format?: string, tz = this.tz): string => {
    const d = dayjs().tz(tz);
    return format ? d.format(format) : d.toISOString();
  };

  /**
   * Add/Subtract days or other units
   */
  static addTime = (
    value: number,
    unit: ManipulateType = "day",
    fromDate?: string | Date | number,
    tz = this.tz,
  ): string => {
    const base = fromDate ? dayjs(fromDate).tz(tz) : dayjs().tz(tz);
    return base.add(value, unit).toISOString();
  };

  /**
   * Calculate difference between two dates in desired unit
   */
  static diff = (
    date1: string | Date,
    date2: string | Date,
    unit: ManipulateType = "millisecond",
  ): number => {
    return dayjs(date1).diff(dayjs(date2), unit);
  };

  /**
   * Get human-readable relative time (e.g. "3 hours ago")
   */
  static fromNow = (date: string | Date): string => {
    return dayjs(date).fromNow();
  };

  /**
   * Convert date from one timezone to another
   */
  static convertTimezone = (date: string | Date, tz = this.tz): string => {
    return dayjs(date).tz(tz).toISOString();
  };
}
