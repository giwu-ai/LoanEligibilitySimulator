import { useEffect, useRef, useState } from "react";
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

function LoadingState() {
  const ref = useRef(null);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    // On stacked (mobile) layouts the result sits below the form, so bring it into view
    if (!window.matchMedia("(min-width: 860px)").matches) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const timer = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="panel result loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-head">
        <span className="spinner" aria-hidden="true" />
        <div>
          <h2>Checking your eligibility…</h2>
          <p className="msg">
            {slow
              ? "This is taking longer than usual. Please keep this page open."
              : "Please wait while we work out your estimate."}
          </p>
        </div>
      </div>
      <div className="skeleton" aria-hidden="true">
        <span className="bar bar-meter" />
        <span className="bar bar-wide" />
        <span className="bar bar-mid" />
        <span className="bar bar-wide" />
        <span className="bar bar-short" />
      </div>
    </section>
  );
}

export default function ResultCard({ result, loading, error }) {
  if (loading) return <LoadingState />;
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
        <div><dt>Total repayable over {result.term === 1 ? "1 month" : `${result.term} months`}</dt><dd>{formatMoney(result.totalRepayable)}</dd></div>
        {result.status !== "approved" && (
          <div><dt>Amount you could borrow instead</dt><dd>{formatMoney(result.maxAmount)}</dd></div>
        )}
      </dl>

      <p className="msg">Estimates only, based on mocked data. This is not a credit decision.</p>
    </section>
  );
}
