# SauceDemo Playwright Framework

A lean Playwright + TypeScript framework for automated testing of SauceDemo.

## Prerequisites

- Node.js 20 or later
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Commands

```bash
npm run test:smoke          # Fast critical-path check (blocking in CI)
npm run test:regression     # Quality gate: expected product behavior (blocking in CI)
npm run test:known-defects  # Monitoring: known defects remain visible (non-blocking in CI)
npm test                    # Full local run: regression + known defects (known defects may fail)
npm run test:headed
npm run report
```

Playwright project names in the report match the suite:

- `smoke`
- `regression` (`@regression` with `@known-defect` inverted)
- `known-defects`

The HTML report is generated in `playwright-report/`; screenshots and traces are retained for failed tests in `test-results/`.

## Development workflow

Work on a feature branch. Do not push product changes straight to `master`.

```text
feature branch
    → commit
    → push
    → Pull Request → master
    → GitHub Actions
    → Smoke (blocking, fast) + Regression (blocking)
    → merge only if blocking jobs pass
```

GitHub Actions (`.github/workflows/playwright.yml`) runs on pull requests and pushes to `master`:

- **Smoke** — `npx tsc --noEmit` and `npm run test:smoke`. Fast critical-path check. A failure fails the workflow.
- **Regression** — `npx tsc --noEmit` and `npm run test:regression`. Main quality gate. A failure fails the workflow. The required status check on `master` remains **Regression**.
- **Known Defects** — `npm run test:known-defects`. Monitoring only. Failures stay visible in the Playwright report and do not block the PR.

`npm test` is for local full-suite inspection. It can be red because known-defect assertions are allowed to fail.

Branch protection for `master` (require PR + required check **Regression**) is configured in the GitHub repository settings, not in this repo. Smoke is not a required status check yet.

## Architecture

- `src/pages` — page interactions and reusable, page-specific actions.
- `src/locators` — semantic selectors only, with one file per page plus shared header locators, and no business logic.
- `src/fixtures` — shared Playwright fixtures and authentication helpers.
- `src/test-data` — users, products, expected values, and data-driven inputs.
- `src/utils` — reusable helpers, assertions, and reporting utilities.
- `tests/smoke` — fast confidence checks tagged `@smoke`.
- `tests/regression` — broader coverage tagged `@regression`.
- `tests/known-defects` — documented defects tagged `@known-defect`.
- `docs` — framework and test-design documentation.

## Tagging

Place the relevant tag in each test title, for example:

```ts
test('successful login @smoke @regression', async ({ page }) => {
  // ...
});
```

Suite selection is configured in `playwright.config.ts` projects and invoked through the npm scripts above. Known-defect tests may also carry `@regression` for classification, but the `regression` project excludes `@known-defect` so the production gate stays independent.

## Locator policy

Use locators in this order: `getByRole`, `getByLabel`, `getByPlaceholder`, stable `getByText`, `getByTestId`, stable CSS attributes, then XPath only when unavoidable. Avoid positional selectors. Playwright `testIdAttribute` is `data-test`, matching SauceDemo’s real test IDs.
