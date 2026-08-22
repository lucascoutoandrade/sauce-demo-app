import type { Locator, Page } from '@playwright/test';

export const productDetailLocators = {
  productName(page: Page): Locator {
    return page.locator('[data-test="inventory-item-name"]');
  },

  productDescription(page: Page): Locator {
    return page.locator('[data-test="inventory-item-desc"]');
  },

  productPrice(page: Page): Locator {
    return page.locator('[data-test="inventory-item-price"]');
  },

  productImage(page: Page): Locator {
    return page.locator('.inventory_details_img');
  },

  addToCartButton(page: Page): Locator {
    return page.locator('[data-test="add-to-cart"]');
  },

  removeButton(page: Page): Locator {
    return page.locator('[data-test="remove"]');
  },

  backToProductsButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Back to products' });
  },

  shoppingCartBadge(page: Page): Locator {
    return page.locator('[data-test="shopping-cart-badge"]');
  }
};
