import type { Locator, Page } from '@playwright/test';

export const loginLocators = {
  usernameInput(page: Page): Locator {
    return page.getByPlaceholder('Username');
  },

  passwordInput(page: Page): Locator {
    return page.getByPlaceholder('Password');
  },

  submitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Login' });
  },

  lockedOutErrorMessage(page: Page): Locator {
    return page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true });
  },

  invalidCredentialsErrorMessage(page: Page): Locator {
    return page.locator('[data-test="error"]');
  }
};
