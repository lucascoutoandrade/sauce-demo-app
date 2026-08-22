import type { Locator, Page } from '@playwright/test';

import { headerLocators } from '../locators/header.locators';
import { inventoryLocators } from '../locators/inventory.locators';
import type { Product } from '../test-data/products';
import type { SortOptionValue } from '../test-data/sorting';

export class InventoryPage {
  public readonly pageTitle: Locator;
  public readonly inventoryList: Locator;
  public readonly inventoryItems: Locator;
  public readonly productNames: Locator;
  public readonly productPrices: Locator;
  public readonly sortDropdown: Locator;
  public readonly shoppingCartLink: Locator;
  public readonly shoppingCartBadge: Locator;

  public constructor(private readonly page: Page) {
    this.pageTitle = inventoryLocators.pageTitle(page);
    this.inventoryList = inventoryLocators.inventoryList(page);
    this.inventoryItems = inventoryLocators.inventoryItems(page);
    this.productNames = inventoryLocators.productNames(page);
    this.productPrices = inventoryLocators.productPrices(page);
    this.sortDropdown = inventoryLocators.sortDropdown(page);
    this.shoppingCartLink = headerLocators.shoppingCartLink(page);
    this.shoppingCartBadge = headerLocators.shoppingCartBadge(page);
  }

  public productItem(product: Product): Locator {
    return inventoryLocators.productItem(this.page, product);
  }

  public productImage(product: Product): Locator {
    return inventoryLocators.productImage(this.page, product);
  }

  public addToCartButton(product: Product): Locator {
    return inventoryLocators.addToCartButton(this.page, product);
  }

  public removeButton(product: Product): Locator {
    return inventoryLocators.removeButton(this.page, product);
  }

  public async addProductToCart(product: Product): Promise<void> {
    await this.addToCartButton(product).click();
  }

  public async openProductDetails(product: Product): Promise<void> {
    await inventoryLocators.productTitleLink(this.page, product).click();
  }

  public async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  public async sortBy(optionValue: SortOptionValue): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }
}
