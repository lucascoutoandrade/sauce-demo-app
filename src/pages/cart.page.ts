import type { Locator, Page } from '@playwright/test';

import { cartLocators } from '../locators/cart.locators';
import { headerLocators } from '../locators/header.locators';
import type { Product } from '../test-data/products';

export class CartPage {
  public readonly pageTitle: Locator;
  public readonly cartItems: Locator;
  public readonly checkoutButton: Locator;
  public readonly shoppingCartBadge: Locator;

  public constructor(private readonly page: Page) {
    this.pageTitle = cartLocators.pageTitle(page);
    this.cartItems = cartLocators.cartItems(page);
    this.checkoutButton = cartLocators.checkoutButton(page);
    this.shoppingCartBadge = headerLocators.shoppingCartBadge(page);
  }

  public cartItem(product: Product): Locator {
    return cartLocators.cartItem(this.page, product);
  }

  public cartItemName(product: Product): Locator {
    return cartLocators.cartItemName(this.page, product);
  }

  public async removeProduct(product: Product): Promise<void> {
    await cartLocators.removeButton(this.page, product).click();
  }

  public async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
