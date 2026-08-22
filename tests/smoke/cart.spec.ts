import { expect, test } from '@playwright/test';

import { CartPage } from '../../src/pages/cart.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { sauceLabsBackpack } from '../../src/test-data/products';
import { standardUserCredentials } from '../../src/test-data/users';

test('TC-015 cart add and remove integrity @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const product = sauceLabsBackpack;

  await loginPage.navigate();
  await loginPage.login(standardUserCredentials);

  await expect(inventoryPage.pageTitle).toBeVisible();
  await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);

  await inventoryPage.addProductToCart(product);

  await expect(inventoryPage.removeButton(product)).toBeVisible();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cartPage.pageTitle).toBeVisible();
  await expect(cartPage.cartItemName(product)).toHaveText(product.name);
  await expect(cartPage.cartItem(product)).toBeVisible();
  await expect(cartPage.shoppingCartBadge).toHaveText('1');

  await cartPage.removeProduct(product);

  await expect(cartPage.cartItem(product)).toHaveCount(0);
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(cartPage.shoppingCartBadge).toHaveCount(0);
});
