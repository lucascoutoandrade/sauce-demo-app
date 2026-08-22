import { expect, test } from '@playwright/test';

import { InventoryPage } from '../../src/pages/inventory.page';
import { LoginPage } from '../../src/pages/login.page';
import { sortScenarios } from '../../src/test-data/sorting';
import { problemUserCredentials } from '../../src/test-data/users';

for (const scenario of sortScenarios) {
  test(`TC-019 problem_user sorting defect ${scenario.optionLabel} @known-defect @regression`, async ({
    page
  }): Promise<void> => {
    // Name A to Z is the default inventory order. Selecting it again is a baseline check,
    // not evidence that sorting is broken. test.fail() is reserved for options that must reorder.
    const optionMustReorder = scenario.optionValue !== 'az';
    if (optionMustReorder) {
      test.fail(
        true,
        'Known defect DEF-PROBLEM-USER-SORT: non-default sort options do not reorder inventory for problem_user'
      );
    }

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(problemUserCredentials);
    await expect(inventoryPage.pageTitle).toBeVisible();

    await inventoryPage.sortBy(scenario.optionValue);

    await expect(inventoryPage.sortDropdown).toHaveValue(scenario.optionValue);
    await expect(inventoryPage.productNames).toHaveText([...scenario.expectedNames]);
    await expect(inventoryPage.productPrices).toHaveText([...scenario.expectedPrices]);
  });
}
