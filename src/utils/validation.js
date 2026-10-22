import { TERMS } from "./loanCalculator.js";
import { formatMoney } from "./format.js";

export const LIMITS = {
  maxMonthly: 1000000, // max monthly income or expenses
  minLoan: 1000,
  maxLoan: 5000000,
};

// digits with an optional decimal part of up to 2 places (no signs, no exponents)
const MONEY_PATTERN = /^\d+(\.\d{1,2})?$/;

function parseMoney(raw) {
  const s = String(raw).trim();
  if (s === "") return { error: "required" };
  if (!MONEY_PATTERN.test(s)) return { error: "format" };
  return { value: Number(s) };
}

const FORMAT_MSG = "Use numbers only, with up to 2 decimals.";

export function validateAll(v) {
  const errors = {};

  const income = parseMoney(v.income);
  if (income.error === "required") errors.income = "Enter your monthly income.";
  else if (income.error === "format") errors.income = FORMAT_MSG;
  else if (income.value <= 0) errors.income = "Income must be greater than R0.";
  else if (income.value > LIMITS.maxMonthly)
    errors.income = `Income cannot be more than ${formatMoney(LIMITS.maxMonthly)} a month.`;

  const expenses = parseMoney(v.expenses);
  if (expenses.error === "required") errors.expenses = "Enter your monthly expenses (use 0 if none).";
  else if (expenses.error === "format") errors.expenses = FORMAT_MSG;
  else if (expenses.value > LIMITS.maxMonthly)
    errors.expenses = `Expenses cannot be more than ${formatMoney(LIMITS.maxMonthly)} a month.`;
  else if (!errors.income && expenses.value >= income.value)
    errors.expenses = "Expenses must be lower than your income.";

  const amount = parseMoney(v.amount);
  if (amount.error === "required") errors.amount = "Enter the loan amount.";
  else if (amount.error === "format") errors.amount = FORMAT_MSG;
  else if (amount.value < LIMITS.minLoan)
    errors.amount = `Minimum loan amount is ${formatMoney(LIMITS.minLoan)}.`;
  else if (amount.value > LIMITS.maxLoan)
    errors.amount = `Maximum loan amount is ${formatMoney(LIMITS.maxLoan)}.`;

  if (!TERMS.includes(Number(v.term))) errors.term = "Choose a repayment period.";

  return errors;
}