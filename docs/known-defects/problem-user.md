# Known Defects — problem_user

These records describe **application defects**, not accepted product behavior. Exploratory observations that are not in the approved matrix are called out separately and must not be treated as approved expected results.

## DEF-PROBLEM-USER-ADD (TC-011)

- Affected user: `problem_user`
- Affected feature: Add to cart (inventory listing vs product detail opened from the listing)
- Classification: Known defect / regression
- Automation coverage: `tests/known-defects/problem-user-add-to-cart.spec.ts`

Reproducible behavior:

1. Log in as `problem_user`.
2. On the inventory listing, click Add to cart for a product.
3. In a separate session, open the same product from the listing title link and click Add to cart on the detail page.

Expected behavior: Add to cart works on both listing and detail for every product.

Actual behavior (approved matrix):

| Product | Add by listing | Add by detail |
| --- | --- | --- |
| Sauce Labs Backpack | Works | Does not work |
| Sauce Labs Bike Light | Works | Does not work |
| Sauce Labs Bolt T-Shirt | Does not work | Works |
| Sauce Labs Fleece Jacket | Does not work | Works |
| Sauce Labs Onesie | Works | Does not work |
| Test.allTheThings() T-Shirt (Red) | Does not work | Works |

Automation notes:

- Each surface is evaluated in its own login session so listing cart state cannot leak into the detail check.
- Listing success is the listing Remove control for that product slug becoming visible.
- Detail success is the detail Remove control (`data-test="remove"`) becoming visible after Add to cart.

## DEF-PROBLEM-USER-LISTING-IMAGE (TC-012)

- Affected user: `problem_user`
- Affected feature: Inventory listing product images
- Classification: Known defect / regression
- Automation coverage: `tests/known-defects/problem-user-listing-images.spec.ts`

Reproducible behavior: Log in as `problem_user` and inspect each listing image `src`.

Expected behavior: Listing image `src` matches the standard_user product asset (stable fragment such as `sauce-backpack`, `bike-light`).

Actual behavior: Listing images are incorrect for all six products (`correctListingImage = false` in the approved matrix). Live DOM shows `sl-404` assets.

## DEF-PROBLEM-USER-DETAIL (TC-013)

- Affected user: `problem_user`
- Affected feature: Product detail identity after opening a listing item
- Classification: Known defect / regression (Fleece, Onesie); observed discrepancy for four matrix-correct products
- Automation coverage: `tests/known-defects/problem-user-product-detail.spec.ts`
- Decision record: `docs/qa-decisions/tc-013-product-detail-identity.md`

Expected behavior: Opening a product from the inventory list shows that product’s name, price, and image.

Approved matrix actual behavior:

| Product | Matrix detail |
| --- | --- |
| Sauce Labs Backpack | Correct |
| Sauce Labs Bike Light | Correct |
| Sauce Labs Bolt T-Shirt | Correct |
| Sauce Labs Fleece Jacket | Incorrect |
| Sauce Labs Onesie | Detail title incorrect |
| Test.allTheThings() T-Shirt (Red) | Correct |

Automation asserts the correct product identity. `test.fail()` is used only for Fleece and Onesie. The four matrix-correct products remain failing tests as intentional discrepancy evidence. Live all-six remapping is documented as an observed QA discrepancy only — not an approved defect.

## DEF-PROBLEM-USER-SORT (TC-019)

- Affected user: `problem_user`
- Affected feature: Inventory sort
- Classification: Known defect / regression
- Automation coverage: `tests/known-defects/problem-user-sorting.spec.ts`

Reproducible behavior: Log in as `problem_user` and select each sort option.

Expected behavior: The selected option reorders names and prices (Name A to Z, Name Z to A, Price low to high, Price high to low).

Actual behavior:

- Name A to Z is already the default order. Selecting it again is a **baseline** check, not a failed sort.
- Name Z to A, Price low to high, and Price high to low do not reorder. The dropdown value also remains `az` for those options.

`test.fail()` is applied only to the three options that must produce a meaningful order change.

## Exploratory observations (not approved defects)

These were seen during automation investigation. They are **not** encoded as approved matrix outcomes:

- After a successful listing add, the listing Remove control for `problem_user` may not restore Add to cart. TC-011 does not use Remove to reset state; it uses a new login instead.
- Direct URL access to `inventory-item.html?id={correctId}` can show the correct product even when the listing title link does not. That path is not the TC-013 user flow.
