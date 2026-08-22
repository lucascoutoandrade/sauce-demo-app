import type { Locator, Page } from '@playwright/test';

import { loginLocators } from '../locators/login.locators';
import type { UserCredentials } from '../test-data/users';

export class LoginPage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly submitButton: Locator;
  public readonly lockedOutErrorMessage: Locator;
  public readonly invalidCredentialsErrorMessage: Locator;

  public constructor(private readonly page: Page) {
    this.usernameInput = loginLocators.usernameInput(page);
    this.passwordInput = loginLocators.passwordInput(page);
    this.submitButton = loginLocators.submitButton(page);
    this.lockedOutErrorMessage = loginLocators.lockedOutErrorMessage(page);
    this.invalidCredentialsErrorMessage = loginLocators.invalidCredentialsErrorMessage(page);
  }

  public async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  public async login(credentials: UserCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.submitButton.click();
  }
}
