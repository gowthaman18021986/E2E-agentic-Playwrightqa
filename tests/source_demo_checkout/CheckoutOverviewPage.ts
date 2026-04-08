import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async getItemTotal() {
    return this.page.locator('[data-test="subtotal-label"]').textContent();
  }

  async getTax() {
    return this.page.locator('[data-test="tax-label"]').textContent();
  }

  async getTotal() {
    return this.page.locator('[data-test="total-label"]').textContent();
  }

  async finish() {
    await this.page.click('[data-test="finish"]');
  }

  async getCompleteHeader() {
    return this.page.locator('.complete-header').textContent();
  }
}