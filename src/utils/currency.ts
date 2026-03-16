import dayjs from "dayjs";

export const fmt = (
  value: string | number | bigint,
  withDecimal: boolean = true,
) => {
  const numValue = Number(value);
  if (isNaN(numValue)) return "0";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: withDecimal ? 2 : 0,
    maximumFractionDigits: withDecimal ? 2 : 0,
  }).format(numValue);
};

// Date formatting utilities
export const formatDate = (
  date: string | Date | number | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateTime = (
  date: string | Date | number | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

export const formatISODate = (
  date: string | Date | number | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDetailedDateTime = (
  date: string | Date | number | null | undefined,
): string => {
  if (!date) return "";
  return dayjs(date).format("DD MMM YYYY, hh:mm A");
};

// Currency formatting with symbol (optional)
export const fmtWithSymbol = (
  value: string | number | bigint,
  currencySymbol = "BDT",
): string => {
  const numValue = Number(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currencyDisplay: "symbol",
    currency: currencySymbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(isNaN(numValue) ? 0 : numValue);
};
