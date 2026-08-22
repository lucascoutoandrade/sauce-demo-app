import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { ProductDetailPage } from '../../src/pages/product-detail.page';
import { inventoryProducts } from '../../src/test-data/products';
import { problemUserCredentials } from '../../src/test-data/users';

for (const product of inventoryProducts) {
  test(`TC-011A problem_user add to cart from product listing: ${product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await expect(inventoryPage.addToCartButton(product)).toBeVisible();
    await inventoryPage.addProductToCart(product);
    await expect(inventoryPage.removeButton(product)).toBeVisible();
  });

  test(`TC-011B problem_user add to cart from product detail: ${product.name} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.openProductDetails(product);
    await expect(page).toHaveURL(/\/inventory-item\.html/);

    await expect(productDetailPage.addToCartButton).toBeVisible();
    await productDetailPage.addToCart();
    await expect(productDetailPage.removeButton).toBeVisible();
  });
}
