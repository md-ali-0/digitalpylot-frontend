import { fmt } from "@/utils/currency";
import { Typography } from "antd";

export const renderAmount = (
  amount: number,
  options?: {
    colorType?: "profit" | "collect" | "due" | "sales" | "purchase" | "balance";
  },
) => {
  if (amount == null) return "";

  let color = "#333"; // Default neutral (blackish)

  switch (options?.colorType) {
    case "profit":
      color = amount > 0 ? "#008000" : amount < 0 ? "#ff0000ff" : "#6b7280"; // green/red/gray
      break;

    case "collect":
      color = amount > 0 ? "#008000" : "#6b7280"; // green if collected
      break;

    case "due":
      color = amount > 0 ? "#ff0000ff" : "#6b7280"; // red if due > 0
      break;

    case "sales":
      color = "#0051ffff"; // Tailwind blue-600
      break;

    case "purchase":
      color = "#000"; // Tailwind amber-600
      break;

    case "balance":
      if (amount > 0) {
        return (
          <Typography.Text type="success">{amount} (Advance)</Typography.Text>
        );
      } else if (amount < 0) {
        return (
          <Typography.Text type="danger">
            {Math.abs(amount)} (Due)
          </Typography.Text>
        );
      } else {
        return <Typography.Text>{amount}</Typography.Text>;
      }

    default:
      color = "#000";
  }

  return <Typography.Text style={{ color }}>{fmt(amount)}</Typography.Text>;
};
