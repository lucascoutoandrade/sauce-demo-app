import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { problemUserProductDefects } from '../../src/test-data/problem-user-defects';
import { problemUserCredentials } from '../../src/test-data/users';

for (const scenario of problemUserProductDefects) {
  test(`TC-012 problem_user listing image correctness: ${scenario.product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const product = scenario.product;

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    const imageSrc = await inventoryPage.getProductImageSrc(product);
    expect(imageSrc).toBeTruthy();

    const imageMatchesProduct = new RegExp(product.imageSrcFragment).test(imageSrc ?? '');
    expect(imageMatchesProduct).toBe(scenario.correctListingImage);
  });
}
