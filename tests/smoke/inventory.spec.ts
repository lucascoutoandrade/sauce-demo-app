import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { inventoryProducts } from '../../src/test-data/products';
import { standardUserCredentials } from '../../src/test-data/users';

test('TC-005 product listing baseline @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();
  await loginPage.login(standardUserCredentials);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.pageTitle).toBeVisible();
  await expect(inventoryPage.inventoryList).toBeVisible();
  await expect(inventoryPage.inventoryItems).toHaveCount(inventoryProducts.length);

  for (const product of inventoryProducts) {
    await expect(inventoryPage.productItem(product)).toBeVisible();
    await expect(inventoryPage.productItem(product).getByText(product.name, { exact: true })).toBeVisible();
    await expect(inventoryPage.productItem(product).getByText(product.price, { exact: true })).toBeVisible();
    await expect(inventoryPage.productImage(product)).toBeVisible();
    await expect(inventoryPage.productImage(product)).toHaveAttribute(
      'src',
      new RegExp(product.imageSrcFragment)
    );
  }
});
