import type { Locator, Page } from '@playwright/test';

import type { Product } from '../test-data/products';

export const cartLocators = {
  pageTitle(page: Page): Locator {
    return page.getByText('Your Cart', { exact: true });
  },

  cartItems(page: Page): Locator {
    return page.getByTestId('inventory-item');
  },

  cartItem(page: Page, product: Product): Locator {
    return page.getByTestId('inventory-item').filter({
      has: page.getByText(product.name, { exact: true })
    });
  },

  cartItemName(page: Page, product: Product): Locator {
    return cartLocators.cartItem(page, product).getByTestId('inventory-item-name');
  },

  removeButton(page: Page, product: Product): Locator {
    return page.getByTestId(`remove-${product.slug}`);
  },

  checkoutButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Checkout' });
  }
};
