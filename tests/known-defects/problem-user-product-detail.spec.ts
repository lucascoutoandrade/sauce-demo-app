import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { ProductDetailPage } from '../../src/pages/product-detail.page';
import { problemUserProductDefects } from '../../src/test-data/problem-user-defects';
import { problemUserCredentials } from '../../src/test-data/users';

for (const scenario of problemUserProductDefects) {
  test(`TC-013 problem_user product detail correctness: ${scenario.product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const product = scenario.product;
    const matrixFlagsIncorrectDetail =
      !scenario.correctDetail || scenario.detailTitleIncorrect === true;

    test.info().annotations.push(
      {
        type: 'qa-decision',
        description:
          'Approved matrix unchanged. Four listing→detail identity discrepancies remain failing tests; not encoded as approved defects. See docs/qa-decisions/tc-013-product-detail-identity.md'
      },
      {
        type: 'matrix-correct-detail',
        description: String(scenario.correctDetail)
      },
      {
        type: 'matrix-detail-title-incorrect',
        description: String(scenario.detailTitleIncorrect === true)
      }
    );

    // test.fail() only for matrix-confirmed incorrect detail. Do not encode unapproved live remapping.
    if (matrixFlagsIncorrectDetail) {
      test.fail(
        true,
        `Approved matrix: product detail is incorrect for ${product.name} under problem_user`
      );
    }

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.openProductDetails(product);
    await expect(page).toHaveURL(/\/inventory-item\.html/);

    await expect(productDetailPage.productName).toHaveText(product.name);
    await expect(productDetailPage.productPrice).toHaveText(product.price);
    await expect(productDetailPage.productImage).toHaveAttribute(
      'src',
      new RegExp(product.imageSrcFragment)
    );
  });
}
