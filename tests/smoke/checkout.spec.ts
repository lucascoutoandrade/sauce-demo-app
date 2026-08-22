import { expect, test } from '@playwright/test';

import { CartPage } from '../../src/pages/cart.page';
import { CheckoutPage } from '../../src/pages/checkout.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import {
  orderConfirmationHeader,
  validCheckoutCustomer
} from '../../src/test-data/checkout';
import { sauceLabsBackpack } from '../../src/test-data/products';
import { standardUserCredentials } from '../../src/test-data/users';

test('TC-020 full checkout happy path @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const product = sauceLabsBackpack;

  await loginPage.navigate();
  await loginPage.login(standardUserCredentials);

  await expect(inventoryPage.pageTitle).toBeVisible();
  await inventoryPage.addProductToCart(product);
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

  await inventoryPage.openCart();
  await expect(cartPage.pageTitle).toBeVisible();
  await expect(cartPage.cartItemName(product)).toHaveText(product.name);

  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await expect(checkoutPage.infoPageTitle).toBeVisible();

  await checkoutPage.fillCustomerInformation(validCheckoutCustomer);
  await checkoutPage.continue();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(checkoutPage.overviewPageTitle).toBeVisible();
  await expect(checkoutPage.overviewItemName(product.name)).toHaveText(product.name);

  await checkoutPage.finish();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(checkoutPage.completePageTitle).toBeVisible();
  await expect(checkoutPage.completeHeader).toHaveText(orderConfirmationHeader);
  await expect(checkoutPage.completeText).toBeVisible();
});
