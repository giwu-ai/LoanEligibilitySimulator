import { useState } from "react";
import { TERMS } from "../utils/loanCalculator.js";

const empty = { income: "", expenses: "", amount: "", term: 60 };

function validate(v) {
  const e = {};
  if (!(Number(v.income) > 0)) e.income = "Enter your monthly income.";
  if (v.expenses === "" || Number(v.expenses) < 0) e.expenses = "Enter your monthly expenses (0 or more).";
  else if (Number(v.expenses) >= Number(v.income)) e.expenses = "Expenses must be lower than income.";
  if (!(Number(v.amount) >= 1000)) e.amount = "Enter a loan amount of at least R1 000.";
  return e;
}

export default function LoanForm({ onSubmit, loading }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  const set = (name) => (ev) => setValues((v) => ({ ...v, [name]: ev.target.value }));

  const submit = (ev) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({
      income: Number(values.income),
      expenses: Number(values.expenses),
      amount: Number(values.amount),
      term: Number(values.term),
    });
  };

  const field = (name, label, hint) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        inputMode="decimal"
        min="0"
        value={values[name]}
        onChange={set(name)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={`${name}-msg`}
      />
      <p id={`${name}-msg`} className={errors[name] ? "msg error" : "msg"}>
        {errors[name] || hint}
      </p>
    </div>
  );

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Your details</h2>
      {field("income", "Monthly income after tax (R)", "All regular income combined.")}
      {field("expenses", "Monthly expenses (R)", "Rent, bills, food, existing debt payments, others.")}
      {field("amount", "Loan amount (R)", "How much you'd like to borrow.")}
      <div className="field">
        <label htmlFor="term">Repayment period</label>
        <select id="term" value={values.term} onChange={set("term")}>
          {TERMS.map((m) => (
            <option key={m} value={m}>{m === 1 ? "1 month" : `${m} months`}</option>
          ))}
        </select>
      </div>
      <div className="actions">
        <button type="submit" className="primary" disabled={loading}>
          {loading ? "Checking…" : "Check eligibility"}
        </button>
        <button
          type="button"
          className="ghost"
          onClick={() => { setValues(empty); setErrors({}); }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
