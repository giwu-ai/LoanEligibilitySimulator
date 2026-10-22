import { useMemo, useState } from "react";
import { TERMS } from "../utils/loanCalculator.js";
import { validateAll } from "../utils/validation.js";

const empty = { income: "", expenses: "", amount: "", term: 60 };
const FIELDS = ["income", "expenses", "amount"];
const BLOCKED_KEYS = ["e", "E", "+", "-"]; // not valid in a money amount

export default function LoanForm({ onSubmit, loading }) {
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validateAll(values), [values]);
  const shown = (name) => ((touched[name] || submitted) ? errors[name] : "");
  const hasErrors = FIELDS.some((n) => errors[n]);

  const set = (name) => (ev) => setValues((v) => ({ ...v, [name]: ev.target.value }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const submit = (ev) => {
    ev.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELDS.find((n) => errors[n]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    onSubmit({
      income: Number(values.income),
      expenses: Number(values.expenses),
      amount: Number(values.amount),
      term: Number(values.term),
    });
  };

  const reset = () => {
    setValues(empty);
    setTouched({});
    setSubmitted(false);
  };

  const field = (name, label, hint) => {
    const error = shown(name);
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={values[name]}
          onChange={set(name)}
          onBlur={blur(name)}
          onKeyDown={(e) => BLOCKED_KEYS.includes(e.key) && e.preventDefault()}
          onWheel={(e) => e.currentTarget.blur()}
          aria-invalid={Boolean(error)}
          aria-describedby={`${name}-msg`}
        />
        <p id={`${name}-msg`} className={error ? "msg error" : "msg"}>
          {error || hint}
        </p>
      </div>
    );
  };

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Your details</h2>

      {submitted && hasErrors && (
        <p className="form-alert" role="alert">
          Please fix the highlighted fields and try again.
        </p>
      )}

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
        <button type="button" className="ghost" onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  );
}
