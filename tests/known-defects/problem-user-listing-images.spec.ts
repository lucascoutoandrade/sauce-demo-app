import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { inventoryProducts } from '../../src/test-data/products';
import { problemUserCredentials } from '../../src/test-data/users';

for (const product of inventoryProducts) {
  test(`TC-012 problem_user listing image correctness: ${product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await expect(inventoryPage.productImage(product)).toBeVisible();
    await expect(inventoryPage.productImage(product)).toHaveAttribute(
      'src',
      new RegExp(product.imageSrcFragment)
    );
  });
}
