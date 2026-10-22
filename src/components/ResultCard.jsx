import AffordabilityMeter from "./AffordabilityMeter.jsx";
import { formatMoney, formatPercent } from "../utils/format.js";

const COPY = {
  approved: {
    title: "Likely eligible",
    text: "Based on what you entered, this loan looks affordable.",
  },
  review: {
    title: "Needs a closer look",
    text: "This loan is a stretch. A lender may ask for more information.",
  },
  declined: {
    title: "Unlikely at this amount",
    text: "This loan would take too much of your income.",
  },
};

export default function ResultCard({ result, loading, error }) {
  if (loading) {
    return (
      <section className="panel result" aria-live="polite">
        <p className="placeholder">Checking your numbers…</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="panel result" aria-live="polite">
        <p className="msg error">Something went wrong. Check your details and try again.</p>
      </section>
    );
  }
  if (!result) {
    return (
      <section className="panel result" aria-live="polite">
        <h2>Your result</h2>
        <p className="placeholder">
          Fill in your details and select Check eligibility to see an estimate.
        </p>
      </section>
    );
  }

  const copy = COPY[result.status];
  return (
    <section className={`panel result ${result.status}`} aria-live="polite">
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>

      <AffordabilityMeter ratio={result.ratio} />

      <dl className="stats">
        <div><dt>Estimated monthly payment</dt><dd>{formatMoney(result.payment)}</dd></div>
        <div><dt>Interest rate (fixed)</dt><dd>{(result.rate * 100).toFixed(1)}%</dd></div>
        <div><dt>Total repayable over {result.term} months</dt><dd>{formatMoney(result.totalRepayable)}</dd></div>
        {result.status !== "approved" && (
          <div><dt>Amount you could borrow instead</dt><dd>{formatMoney(result.maxAmount)}</dd></div>
        )}
      </dl>

      <p className="msg">Estimates only, based on mocked data. This is not a credit decision.</p>
    </section>
  );
}
