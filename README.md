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
npm run test:smoke          # Smoke only
npm run test:regression     # Regression excluding known defects (production gate)
npm run test:known-defects  # Known defects only (failures remain visible)
npm test                    # Full suite: regression + known defects
npm run test:headed
npm run report
```

Playwright project names in the report match the suite:

- `smoke`
- `regression` (`@regression` with `@known-defect` inverted)
- `known-defects`

The HTML report is generated in `playwright-report/`; screenshots and traces are retained for failed tests in `test-results/`.

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
