import type { Locator, Page } from '@playwright/test';

import { checkoutLocators } from '../locators/checkout.locators';
import type { CheckoutCustomer } from '../test-data/checkout';

export class CheckoutPage {
  public readonly infoPageTitle: Locator;
  public readonly overviewPageTitle: Locator;
  public readonly completePageTitle: Locator;
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly postalCodeInput: Locator;
  public readonly continueButton: Locator;
  public readonly finishButton: Locator;
  public readonly errorMessage: Locator;
  public readonly completeHeader: Locator;
  public readonly completeText: Locator;

  public constructor(private readonly page: Page) {
    this.infoPageTitle = checkoutLocators.infoPageTitle(page);
    this.overviewPageTitle = checkoutLocators.overviewPageTitle(page);
    this.completePageTitle = checkoutLocators.completePageTitle(page);
    this.firstNameInput = checkoutLocators.firstNameInput(page);
    this.lastNameInput = checkoutLocators.lastNameInput(page);
    this.postalCodeInput = checkoutLocators.postalCodeInput(page);
    this.continueButton = checkoutLocators.continueButton(page);
    this.finishButton = checkoutLocators.finishButton(page);
    this.errorMessage = checkoutLocators.errorMessage(page);
    this.completeHeader = checkoutLocators.completeHeader(page);
    this.completeText = checkoutLocators.completeText(page);
  }

  public overviewItemName(productName: string): Locator {
    return checkoutLocators.overviewItemName(this.page, productName);
  }

  public async fillCustomerInformation(customer: CheckoutCustomer): Promise<void> {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  public async continue(): Promise<void> {
    await this.continueButton.click();
  }

  public async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
