# Loan Eligibility Simulator

A responsive React app where customers enter their income, expenses and desired loan amount to see an estimated eligibility result. Results are mocked, in South African rand (ZAR).

## Run with Docker Compose

```bash
docker compose up --build
```

Open http://localhost:8080

Stop it with `docker compose down`.

## Project structure

```
LoanEligibilitySimulator/
├── docker-compose.yml
├── Dockerfile
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

Repayment periods run from 1 to 72 months at a mocked 11.5% yearly rate. Eligibility compares (expenses + new monthly payment) to income:

| Share of income | Result |
|---|---|
| 40% or less | Likely eligible |
| 40% to 50% | Needs a closer look |
| Above 50% | Unlikely at this amount |

Estimates only. This is not a credit decision.
