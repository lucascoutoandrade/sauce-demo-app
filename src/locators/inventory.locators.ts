import type { Locator, Page } from '@playwright/test';

import type { Product } from '../test-data/products';

export const inventoryLocators = {
  pageTitle(page: Page): Locator {
    return page.getByText('Products', { exact: true });
  },

  inventoryList(page: Page): Locator {
    return page.getByTestId('inventory-list');
  },

  inventoryItems(page: Page): Locator {
    return page.getByTestId('inventory-item');
  },

  productNames(page: Page): Locator {
    return page.getByTestId('inventory-item-name');
  },

  productPrices(page: Page): Locator {
    return page.getByTestId('inventory-item-price');
  },

  productItem(page: Page, product: Product): Locator {
    return page.getByTestId('inventory-item').filter({
      has: page.getByText(product.name, { exact: true })
    });
  },

  productImage(page: Page, product: Product): Locator {
    return page.getByTestId(`inventory-item-${product.slug}-img`);
  },

  productTitleLink(page: Page, product: Product): Locator {
    return page.getByTestId(`item-${product.id}-title-link`);
  },

  addToCartButton(page: Page, product: Product): Locator {
    return page.getByTestId(`add-to-cart-${product.slug}`);
  },

  removeButton(page: Page, product: Product): Locator {
    return page.getByTestId(`remove-${product.slug}`);
  },

  sortDropdown(page: Page): Locator {
    return page.getByRole('combobox');
  }
};
