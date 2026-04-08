import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async removeItem(item: string) {
    await this.page.click(`[data-test="remove-${item}"]`);
  }

  async continueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

  async getCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]').textContent();
  }

  async getItemNames() {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }
}