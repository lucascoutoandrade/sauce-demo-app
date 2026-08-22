import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { ProductDetailPage } from '../../src/pages/product-detail.page';
import { problemUserProductDefects } from '../../src/test-data/problem-user-defects';
import { problemUserCredentials } from '../../src/test-data/users';

for (const scenario of problemUserProductDefects) {
  test(`TC-011 problem_user add-to-cart by surface: ${scenario.product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const product = scenario.product;

    // Listing surface: independent session so leftover cart state cannot affect this check.
    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.addProductToCart(product);
    if (scenario.addByListingWorks) {
      await expect(inventoryPage.removeButton(product)).toBeVisible();
    } else {
      await expect(inventoryPage.removeButton(product)).toHaveCount(0);
      await expect(inventoryPage.addToCartButton(product)).toBeVisible();
    }

    // Detail surface: new login establishes independent state for the second surface.
    // Re-login is isolation, not a reset via the listing Remove control.
    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.openProductDetails(product);
    await expect(page).toHaveURL(/\/inventory-item\.html/);

    if (scenario.addByDetailWorks) {
      await expect(productDetailPage.addToCartButton).toBeVisible();
      await productDetailPage.addToCart();
      await expect(productDetailPage.removeButton).toBeVisible();
    } else {
      if (await productDetailPage.addToCartButton.isVisible()) {
        await productDetailPage.addToCart();
      }
      await expect(productDetailPage.removeButton).toHaveCount(0);
    }
  });
}
