import { expect, test } from '@playwright/test';

import { CartPage } from '../../src/pages/cart.page';
import { CheckoutPage } from '../../src/pages/checkout.page';
import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import {
  checkoutRequiredFieldErrors,
  validCheckoutCustomer
} from '../../src/test-data/checkout';
import { sauceLabsBackpack } from '../../src/test-data/products';
import { standardUserCredentials } from '../../src/test-data/users';

test('TC-028 checkout required field validation @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login(standardUserCredentials);
  await inventoryPage.addProductToCart(sauceLabsBackpack);
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await expect(checkoutPage.infoPageTitle).toBeVisible();

  await checkoutPage.continue();
  await expect(checkoutPage.errorMessage).toHaveText(checkoutRequiredFieldErrors.firstName);

  await checkoutPage.firstNameInput.fill(validCheckoutCustomer.firstName);
  await checkoutPage.continue();
  await expect(checkoutPage.errorMessage).toHaveText(checkoutRequiredFieldErrors.lastName);

  await checkoutPage.lastNameInput.fill(validCheckoutCustomer.lastName);
  await checkoutPage.continue();
  await expect(checkoutPage.errorMessage).toHaveText(checkoutRequiredFieldErrors.postalCode);
});
