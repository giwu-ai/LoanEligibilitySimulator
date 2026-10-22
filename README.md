# Loan Eligibility Simulator

A responsive React app where customers enter their income, expenses and desired loan amount to see an estimated eligibility result. All results are **mocked**; this is not a real credit decision.

- React 18 + Vite
- Plain CSS, mobile-first (no Tailwind)
- Amounts in South African rand (ZAR)
- Docker Compose build (nginx serving the production bundle)

## Quick start

Requires [Docker](https://docs.docker.com/get-docker/) with Compose.

```bash
docker compose up --build
```

Open <http://localhost:8080>.

Stop it with `docker compose down`.

### Without Docker

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Project structure

```
LoanEligibilitySimulator/
├── docker-compose.yml
├── Dockerfile            # multi-stage: node build -> nginx
├── nginx.conf
├── .dockerignore
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── LoanForm.jsx
    │   ├── ResultCard.jsx
    │   └── AffordabilityMeter.jsx
    ├── services/
    │   └── mockEligibilityApi.js
    ├── utils/
    │   ├── loanCalc.js
    │   └── format.js
    └── styles/
        └── index.css
```

## How it works

**Inputs:** monthly income (after tax), monthly expenses, loan amount, and repayment period (12 to 72 months). Fields are validated inline.

**Mock rules** (`src/utils/loanCalc.js`, `src/services/mockEligibilityApi.js`):

- Fixed interest rate of 11.5% per year.
- The monthly payment uses the standard amortisation formula.
- Ratio = (monthly expenses + new payment) / monthly income.

| Ratio | Result |
|---|---|
| 40% or less | Likely eligible |
| 40% to 50% | Needs a closer look |
| Above 50% | Unlikely at this amount |

When the result is not "Likely eligible", the app also shows the largest amount that would fit within the 40% limit for the chosen term.

**Result card:** estimated monthly payment, interest rate, total repayable, and an affordability meter showing where the ratio falls between the green, amber and red zones.

## Customising

- **Rates and thresholds:** edit the constants in `src/utils/loanCalc.js`.
- **Currency:** change the locale and currency code in `src/utils/format.js`.
- **Real API:** replace the body of `checkEligibility()` in `src/services/mockEligibilityApi.js`. The UI only depends on the shape of the object it returns: `status`, `ratio`, `payment`, `rate`, `term`, `totalRepayable`, `maxAmount`.

## Styling

`src/styles/index.css` is mobile-first: base styles target phones, and larger screens are layered on with `min-width` media queries.

| Breakpoint | Layout |
|---|---|
| Base | Single column, stacked buttons, touch-friendly 48px controls |
| 600px+ | Side-by-side buttons, label/value rows in the results |
| 860px+ | Two-column layout, sticky result card |
| 1200px+ | Wider spacing for desktops |

## Docker notes

- The `Dockerfile` builds the app with Node 20, then copies `dist/` into an nginx image.
- `nginx.conf` falls back to `index.html` and caches built assets.
- To use a different host port, change `"8080:80"` in `docker-compose.yml`.

## Disclaimer

Figures are illustrative only and use mocked data. They do not represent an offer or a credit decision.
