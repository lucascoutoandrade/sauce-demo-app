import type { Locator, Page } from '@playwright/test';

import { productDetailLocators } from '../locators/product-detail.locators';

export class ProductDetailPage {
  public readonly productName: Locator;
  public readonly productPrice: Locator;
  public readonly productImage: Locator;
  public readonly addToCartButton: Locator;
  public readonly removeButton: Locator;

  public constructor(page: Page) {
    this.productName = productDetailLocators.productName(page);
    this.productPrice = productDetailLocators.productPrice(page);
    this.productImage = productDetailLocators.productImage(page);
    this.addToCartButton = productDetailLocators.addToCartButton(page);
    this.removeButton = productDetailLocators.removeButton(page);
  }

  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
