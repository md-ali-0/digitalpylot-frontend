/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AmountTotals {
  totalSalesAmount: number;
  totalPurchaseAmount: number;
  totalProfit: number;
  sectionBreakdown: {
    [sectionName: string]: {
      salesAmount: number;
      purchaseAmount: number;
      profit: number;
      count: number;
    };
  };
}

export function calculateAllAmounts(formValues: any): AmountTotals {
  const sections = [
    "airTicket",
    "hotel",
    "visa",
    "transport",
    "food",
    "passport",
  ];

  let totalSalesAmount = 0;
  let totalPurchaseAmount = 0;
  let totalProfit = 0;
  const sectionBreakdown: AmountTotals["sectionBreakdown"] = {};

  sections.forEach((sectionName) => {
    const sectionData = formValues[sectionName];
    let sectionSales = 0;
    let sectionPurchase = 0;
    let sectionProfit = 0;
    let count = 0;

    if (Array.isArray(sectionData)) {
      // Handle multiple entries per section
      sectionData.forEach((item) => {
        if (item) {
          const sales = Number.parseFloat(item.salesAmount) || 0;
          const purchase = Number.parseFloat(item.purchaseAmount) || 0;
          const profit = Number.parseFloat(item.profit) || sales - purchase;

          sectionSales += sales;
          sectionPurchase += purchase;
          sectionProfit += profit;
          count++;
        }
      });
    } else if (sectionData) {
      // Handle single entry sections
      const sales = Number.parseFloat(sectionData.salesAmount) || 0;
      const purchase = Number.parseFloat(sectionData.purchaseAmount) || 0;
      const profit = Number.parseFloat(sectionData.profit) || sales - purchase;

      sectionSales = sales;
      sectionPurchase = purchase;
      sectionProfit = profit;
      count = 1;
    }

    totalSalesAmount += sectionSales;
    totalPurchaseAmount += sectionPurchase;
    totalProfit += sectionProfit;

    sectionBreakdown[sectionName] = {
      salesAmount: sectionSales,
      purchaseAmount: sectionPurchase,
      profit: sectionProfit,
      count,
    };
  });

  return {
    totalSalesAmount,
    totalPurchaseAmount,
    totalProfit,
    sectionBreakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(amount);
}
