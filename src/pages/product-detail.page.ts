import type { Locator, Page } from '@playwright/test';

import { productDetailLocators } from '../locators/product-detail.locators';

export class ProductDetailPage {
  public readonly productName: Locator;
  public readonly productDescription: Locator;
  public readonly productPrice: Locator;
  public readonly productImage: Locator;
  public readonly addToCartButton: Locator;
  public readonly removeButton: Locator;
  public readonly backToProductsButton: Locator;
  public readonly shoppingCartBadge: Locator;

  public constructor(page: Page) {
    this.productName = productDetailLocators.productName(page);
    this.productDescription = productDetailLocators.productDescription(page);
    this.productPrice = productDetailLocators.productPrice(page);
    this.productImage = productDetailLocators.productImage(page);
    this.addToCartButton = productDetailLocators.addToCartButton(page);
    this.removeButton = productDetailLocators.removeButton(page);
    this.backToProductsButton = productDetailLocators.backToProductsButton(page);
    this.shoppingCartBadge = productDetailLocators.shoppingCartBadge(page);
  }

  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  public async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? '';
  }

  public async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent())?.trim() ?? '';
  }

  public async getProductImageSrc(): Promise<string | null> {
    return this.productImage.getAttribute('src');
  }

  public async isAddToCartVisible(): Promise<boolean> {
    return this.addToCartButton.isVisible();
  }

  public async isRemoveVisible(): Promise<boolean> {
    return this.removeButton.isVisible();
  }
}
