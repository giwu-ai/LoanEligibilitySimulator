export const ANNUAL_RATE = 0.115; // mocked flat rate
export const MAX_RATIO = 0.4; // approve if total monthly outgoings <= 40% of income
export const REVIEW_RATIO = 0.5; // 40-50% needs manual review
export const TERMS = [1, 2, 3, 6, 12, 18, 24, 36, 48, 60, 72];

export function monthlyPayment(principal, annualRate, months) {
  const r = annualRate / 12;
  return r === 0 ? principal / months : (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function maxPrincipal(payment, annualRate, months) {
  const r = annualRate / 12;
  return r === 0 ? payment * months : (payment * (1 - Math.pow(1 + r, -months))) / r;
}
