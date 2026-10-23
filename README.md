# Loan Eligibility Simulator

A responsive React app where customers enter their income, expenses and desired loan amount to see an estimated eligibility result. Results are mocked, in South African rand (ZAR).

## Getting started

Requires [Docker](https://docs.docker.com/get-docker/) and [Git](https://git-scm.com/downloads).

1. Clone the repo:

```bash
git clone https://github.com/giwu-ai/LoanEligibilitySimulator.git
cd LoanEligibilitySimulator
```

2. Build and run with Docker Compose:

```bash
docker compose up --build
```

3. Open http://localhost:8080

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
    │   ├── loanCalculator.js
    │   ├── validation.js
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

## Future: real API

The app currently uses mocked data. A real backend, likely Spring Boot, can replace it. Replace the body of `checkEligibility()` in `src/services/mockEligibilityApi.js` with a call to the API. The UI only depends on the shape of the object it returns:

`status`, `ratio`, `payment`, `rate`, `term`, `totalRepayable`, `maxAmount`

Estimates only. This is not a credit decision.
