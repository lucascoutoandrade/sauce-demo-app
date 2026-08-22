import type { Locator, Page } from '@playwright/test';

import type { Product } from '../test-data/products';

export const cartLocators = {
  pageTitle(page: Page): Locator {
    return page.getByText('Your Cart', { exact: true });
  },

  cartItems(page: Page): Locator {
    return page.locator('[data-test="inventory-item"]');
  },

  cartItem(page: Page, product: Product): Locator {
    return page.locator('[data-test="inventory-item"]').filter({
      has: page.getByText(product.name, { exact: true })
    });
  },

  cartItemName(page: Page, product: Product): Locator {
    return cartLocators.cartItem(page, product).locator('[data-test="inventory-item-name"]');
  },

  removeButton(page: Page, product: Product): Locator {
    return page.locator(`[data-test="remove-${product.slug}"]`);
  },

  checkoutButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Checkout' });
  },

  shoppingCartBadge(page: Page): Locator {
    return page.locator('[data-test="shopping-cart-badge"]');
  }
};
