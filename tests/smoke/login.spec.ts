import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import {
  invalidStandardUserCredentials,
  lockedOutUserCredentials,
  standardUserCredentials
} from '../../src/test-data/users';

test('TC-001 valid login succeeds @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.navigate();

  await expect(page).toHaveURL(/\/$/);
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.submitButton).toBeVisible();

  await loginPage.login(standardUserCredentials);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.pageTitle).toBeVisible();
});

test('TC-002 locked-out account is rejected @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(lockedOutUserCredentials);

  await expect(loginPage.lockedOutErrorMessage).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test('TC-004 invalid credentials are rejected @smoke @regression', async ({ page }): Promise<void> => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(invalidStandardUserCredentials);

  await expect(loginPage.invalidCredentialsErrorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
  await expect(page).toHaveURL(/\/$/);
});
