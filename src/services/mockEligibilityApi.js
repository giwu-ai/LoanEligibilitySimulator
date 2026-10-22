import {
  ANNUAL_RATE, MAX_RATIO, REVIEW_RATIO, monthlyPayment, maxPrincipal,
} from "../utils/loanCalculator.js";

/**
 * Mocked eligibility check. Replace the body with a real fetch() later;
 * the component only depends on the shape of the returned object.
 */
export function checkEligibility({ income, expenses, amount, term }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payment = monthlyPayment(amount, ANNUAL_RATE, term);
      const ratio = (expenses + payment) / income;
      const maxPayment = Math.max(0, income * MAX_RATIO - expenses);

      let status = "declined";
      if (ratio <= MAX_RATIO) status = "approved";
      else if (ratio <= REVIEW_RATIO) status = "review";

      resolve({
        status,
        ratio,
        payment,
        rate: ANNUAL_RATE,
        term,
        totalRepayable: payment * term,
        maxAmount: maxPrincipal(maxPayment, ANNUAL_RATE, term),
      });
    }, 900);
  });
}
