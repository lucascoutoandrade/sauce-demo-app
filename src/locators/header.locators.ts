import type { Locator, Page } from '@playwright/test';

export const headerLocators = {
  shoppingCartLink(page: Page): Locator {
    // Icon-only link; no accessible name in the DOM.
    return page.getByTestId('shopping-cart-link');
  },

  shoppingCartBadge(page: Page): Locator {
    return page.getByTestId('shopping-cart-badge');
  }
};
