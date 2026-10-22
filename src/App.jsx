import { useState } from "react";
import LoanForm from "./components/LoanForm.jsx";
import ResultCard from "./components/ResultCard.jsx";
import { checkEligibility } from "./services/mockEligibilityApi.js";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (input) => {
    setLoading(true);
    setError(false);
    try {
      setResult(await checkEligibility(input));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <header className="intro">
        <h1>See what you could borrow</h1>
        <p>Enter your income, expenses and the amount you want. No credit check, no commitment.</p>
      </header>
      <div className="grid">
        <LoanForm onSubmit={handleSubmit} loading={loading} />
        <ResultCard result={result} loading={loading} error={error} />
      </div>
    </main>
  );
}
