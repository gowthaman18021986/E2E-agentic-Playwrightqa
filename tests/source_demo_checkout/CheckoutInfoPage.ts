import { Page } from '@playwright/test';

export class CheckoutInfoPage {
  constructor(private page: Page) {}

  async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async continue() {
    await this.page.click('[data-test="continue"]');
  }

  async cancel() {
    await this.page.click('[data-test="cancel"]');
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]').textContent();
  }
}