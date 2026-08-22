import type { Locator, Page } from '@playwright/test';

export const checkoutLocators = {
  infoPageTitle(page: Page): Locator {
    return page.getByText('Checkout: Your Information', { exact: true });
  },

  overviewPageTitle(page: Page): Locator {
    return page.getByText('Checkout: Overview', { exact: true });
  },

  completePageTitle(page: Page): Locator {
    return page.getByText('Checkout: Complete!', { exact: true });
  },

  firstNameInput(page: Page): Locator {
    return page.getByPlaceholder('First Name');
  },

  lastNameInput(page: Page): Locator {
    return page.getByPlaceholder('Last Name');
  },

  postalCodeInput(page: Page): Locator {
    return page.getByPlaceholder('Zip/Postal Code');
  },

  continueButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Continue' });
  },

  finishButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Finish' });
  },

  errorMessage(page: Page): Locator {
    return page.locator('[data-test="error"]');
  },

  overviewItemName(page: Page, productName: string): Locator {
    return page.locator('[data-test="inventory-item-name"]').filter({
      hasText: productName
    });
  },

  completeHeader(page: Page): Locator {
    return page.locator('[data-test="complete-header"]');
  },

  completeText(page: Page): Locator {
    return page.locator('[data-test="complete-text"]');
  }
};
