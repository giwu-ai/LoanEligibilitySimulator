const money = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export const formatMoney = (n) => money.format(Math.round(n));
export const formatPercent = (n) => `${Math.round(n * 100)}%`;
