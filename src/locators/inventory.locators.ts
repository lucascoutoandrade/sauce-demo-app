import type { Locator, Page } from '@playwright/test';

import type { Product } from '../test-data/products';

export const inventoryLocators = {
  pageTitle(page: Page): Locator {
    return page.getByText('Products', { exact: true });
  },

  inventoryList(page: Page): Locator {
    return page.locator('[data-test="inventory-list"]');
  },

  inventoryItems(page: Page): Locator {
    return page.locator('[data-test="inventory-item"]');
  },

  productNames(page: Page): Locator {
    return page.locator('[data-test="inventory-item-name"]');
  },

  productPrices(page: Page): Locator {
    return page.locator('[data-test="inventory-item-price"]');
  },

  productImages(page: Page): Locator {
    // data-test values are product-specific; class scopes the listing image set.
    return page.locator('.inventory_item_img img');
  },

  productItem(page: Page, product: Product): Locator {
    return page.locator('[data-test="inventory-item"]').filter({
      has: page.getByText(product.name, { exact: true })
    });
  },

  productImage(page: Page, product: Product): Locator {
    return page.locator(`[data-test="inventory-item-${product.slug}-img"]`);
  },

  productTitleLink(page: Page, product: Product): Locator {
    return page.locator(`[data-test="item-${product.id}-title-link"]`);
  },

  addToCartButton(page: Page, product: Product): Locator {
    return page.locator(`[data-test="add-to-cart-${product.slug}"]`);
  },

  removeButton(page: Page, product: Product): Locator {
    return page.locator(`[data-test="remove-${product.slug}"]`);
  },

  sortDropdown(page: Page): Locator {
    return page.getByRole('combobox');
  },

  shoppingCartLink(page: Page): Locator {
    return page.locator('[data-test="shopping-cart-link"]');
  },

  shoppingCartBadge(page: Page): Locator {
    return page.locator('[data-test="shopping-cart-badge"]');
  }
};
