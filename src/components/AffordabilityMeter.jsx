import { MAX_RATIO, REVIEW_RATIO } from "../utils/loanCalc.js";
import { formatPercent } from "../utils/format.js";

const SCALE = 0.7; // meter runs from 0% to 70% of income

export default function AffordabilityMeter({ ratio }) {
  const pos = Math.min(ratio, SCALE) / SCALE * 100;
  return (
    <div className="meter" role="img"
      aria-label={`Monthly outgoings with this loan would be ${formatPercent(ratio)} of income`}>
      <div className="meter-track">
        <span className="zone ok" style={{ width: `${(MAX_RATIO / SCALE) * 100}%` }} />
        <span className="zone warn" style={{ width: `${((REVIEW_RATIO - MAX_RATIO) / SCALE) * 100}%` }} />
        <span className="zone bad" style={{ flex: 1 }} />
        <span className="marker" style={{ left: `${pos}%` }}>
          <b>{formatPercent(ratio)}</b>
        </span>
      </div>
      <div className="meter-scale">
        <span>0%</span>
        <span style={{ left: `${(MAX_RATIO / SCALE) * 100}%` }}>40%</span>
        <span style={{ left: `${(REVIEW_RATIO / SCALE) * 100}%` }}>50%</span>
      </div>
      <p className="msg">Share of income going to expenses plus this loan.</p>
    </div>
  );
}
