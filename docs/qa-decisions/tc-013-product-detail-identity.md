# QA Decision — TC-013 Product Detail Identity

Status: **Decision confirmed. Approved matrix unchanged.**

## Decision

Keep the approved Risk-Based Test Matrix v2 as the source of truth.

Do **not** approve the live all-six listing→detail remapping as expected behavior.

## Approved matrix (unchanged)

| Listing product | Add by listing | Add by detail | Listing image | Detail |
| --- | --- | --- | --- | --- |
| Sauce Labs Backpack | Yes | No | No | **Yes** |
| Sauce Labs Bike Light | Yes | No | No | **Yes** |
| Sauce Labs Bolt T-Shirt | No | Yes | No | **Yes** |
| Sauce Labs Fleece Jacket | No | Yes | No | **No** |
| Sauce Labs Onesie | Yes | No | No | **Title incorrect** |
| Test.allTheThings() T-Shirt (Red) | No | Yes | No | **Yes** |

## Live application inspection

Listing title-link navigation as `problem_user` showed a broader product identity remapping:

| Listing product | Name actually shown |
| --- | --- |
| Sauce Labs Backpack | Sauce Labs Fleece Jacket |
| Sauce Labs Bike Light | Sauce Labs Bolt T-Shirt |
| Sauce Labs Bolt T-Shirt | Sauce Labs Onesie |
| Sauce Labs Fleece Jacket | ITEM NOT FOUND |
| Sauce Labs Onesie | Test.allTheThings() T-Shirt (Red) |
| Test.allTheThings() T-Shirt (Red) | Sauce Labs Backpack |

That broader behavior has **not** been approved as expected behavior and must not be encoded as such in automation.

## Automation consequences

- TC-013 asserts the correct product name, price, and image for the listing item that was opened.
- **Fleece Jacket** and **Onesie** use `test.fail()` only because those defects are explicitly confirmed in the approved matrix.
- These four tests remain **red** because the application does not satisfy the approved expectation:
  - Sauce Labs Backpack
  - Sauce Labs Bike Light
  - Sauce Labs Bolt T-Shirt
  - Test.allTheThings() T-Shirt (Red)
- Those four failures are intentional evidence of a discrepancy. They must not be hidden with `test.fail()` or weakened assertions.
- The four additional discrepancies require a further QA/product decision before any matrix change.

## Suite expectation

29 passed / 4 failed until the matrix is intentionally revised by QA/product.
