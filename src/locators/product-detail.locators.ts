import type { Locator, Page } from '@playwright/test';

export const productDetailLocators = {
  productName(page: Page): Locator {
    return page.getByTestId('inventory-item-name');
  },

  productPrice(page: Page): Locator {
    return page.getByTestId('inventory-item-price');
  },

  productImage(page: Page): Locator {
    // data-test is product-specific (item-{slug}-img). getByRole('img') also
    // matches menu/back icons. Class is the stable generic product image hook.
    return page.locator('.inventory_details_img');
  },

  addToCartButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Add to cart' });
  },

  removeButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Remove' });
  }
};
