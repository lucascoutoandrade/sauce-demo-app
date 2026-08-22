# Engineering and QA Standards

Apply these standards whenever creating or modifying this repository. Review and validate AI-generated code before accepting it.

## Playwright

- Use Playwright with TypeScript and the Page Object Model.
- Use Playwright web-first assertions such as `await expect(locator).toBeVisible()`.
- Create reusable fixtures only where setup is genuinely shared; use data-driven testing when it improves coverage or clarity.
- Keep tests independent, isolated, and order-agnostic. Each test must establish the state it needs.
- Make assertions meaningful to the scenario's objective. Never hide, remove, or weaken an assertion merely to pass a test.
- Never use `waitForTimeout()` unless a documented technical reason makes it unavoidable. Prefer observable application state, locator assertions, or Playwright auto-waiting.
- Do not invent application behavior, inputs, or expected results. Inspect the application or rely on validated requirements before encoding expectations.

## Locator Strategy

Use locator APIs in this priority order:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()` when the text is a stable identifier
5. `getByTestId()` when an existing stable test ID is available
6. CSS using stable attributes
7. XPath only as a last resort

- Prefer semantic, user-facing, and stable locators over DOM structure.
- Avoid brittle selectors, `nth-child`, and positional selectors whenever possible.
- Do not invent `data-testid` attributes in the application.
- If CSS or XPath is required, explain in the code review or implementation report why a higher-priority locator was unsuitable.

## Architecture

- `src/pages/`: Page Objects, page behavior, and reusable actions.
- `src/locators/`: selectors only; no business logic.
- `src/fixtures/`: shared Playwright fixtures and reusable test setup.
- `src/test-data/`: users, products, expected values, and data-driven inputs.
- `src/utils/`: only genuinely reusable utilities.
- `tests/smoke/`: critical, fast scenarios.
- `tests/regression/`: broader functional regression coverage.
- `tests/known-defects/`: deterministic coverage for documented application defects.
- `docs/`: test strategy, exploratory testing, bug documentation, and supporting evidence.

## TypeScript

- TypeScript is the only source language for this repository. Do not create, maintain, or commit generated JavaScript source or test files. TypeScript validation must use `noEmit`.
- Treat TypeScript as a strongly typed language. Avoid `any`, implicit `any`, and casts used to bypass errors.
- Explicitly type function parameters and return values, test data, fixtures, and structured domain data when this improves clarity or prevents ambiguity.
- Use interfaces or type aliases for structured test data. Keep domain types close to the domain they describe.
- Let clear inference stand; do not add types solely for verbosity.
- Prefer type-system feedback to runtime workarounds.

## Code Quality

- Keep methods focused, readable, and consistently named.
- Apply DRY only when duplication is meaningful. Do not introduce abstractions without a real reuse case.
- Keep responsibilities separate: selectors, page behavior, test data, fixtures, tests, and utilities must not be conflated.
- Prefer maintainability over cleverness. Do not duplicate selectors or test data unnecessarily.

## Validation Expectations

- Run the smallest relevant test suite after a change, then investigate failures rather than masking them.
- Re-run affected tests after implementation fixes.
- Before handoff, review locator quality, assertion quality, duplication, isolation, and maintainability.
- Do not begin new product test coverage until the applicable requirement and risk-based test matrix have been approved.
