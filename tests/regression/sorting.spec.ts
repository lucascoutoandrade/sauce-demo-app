import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { sortScenarios } from '../../src/test-data/sorting';
import { standardUserCredentials } from '../../src/test-data/users';

for (const scenario of sortScenarios) {
  test(`TC-018 product sorting ${scenario.optionLabel} @regression`, async ({
    page
  }): Promise<void> => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(standardUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.sortBy(scenario.optionValue);

    await expect(inventoryPage.sortDropdown).toHaveValue(scenario.optionValue);
    await expect(inventoryPage.productNames).toHaveText([...scenario.expectedNames]);
    await expect(inventoryPage.productPrices).toHaveText([...scenario.expectedPrices]);
  });
}
