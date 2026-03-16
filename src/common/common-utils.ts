import dayjs from "dayjs";

type FormatAmountType = "1,000.00" | "1.000,00" | "1'000.00" | "1,000";

export class Utils {
  static formatDateRange(
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null],
  ): string {
    if (!dates || dates.length !== 2) return "";

    const [start, end] = dates;
    return `${dayjs(start).format("DD-MM-YYYY")} to ${dayjs(end).format(
      "DD-MM-YYYY",
    )}`;
  }

  static formatSnackCase = (text: string) => {
    return text
      ? text
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
  };

  static formatNarration = (text: string) => {
    return text
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  static formatAmount(
    amount: number | string,
    format: FormatAmountType = "1,000.00",
  ): string {
    const absoluteAmount = Math.abs(Number(amount || 0));
    const integerPart = Math.floor(absoluteAmount);
    const decimalPart = Math.round((absoluteAmount - integerPart) * 100);

    switch (format) {
      case "1.000,00": // European format
        return `${integerPart.toLocaleString("de-DE")},${decimalPart
          .toString()
          .padStart(2, "0")}`;

      case "1'000.00": // Swiss format
        return `${integerPart.toLocaleString("de-CH")}.${decimalPart
          .toString()
          .padStart(2, "0")}`;

      case "1,000":
        return `${integerPart.toLocaleString("en-US")}`;

      case "1,000.00": // US/UK format (default)
      default:
        return `${integerPart.toLocaleString("en-US")}.${decimalPart
          .toString()
          .padStart(2, "0")}`;
    }
  }

  static formatCurrency(amount: number): string {
    const formattedNumber = this.formatAmount(amount);
    return `৳ ${formattedNumber}`;
  }
}
