import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async sortBy(option: string) {
    await this.page.selectOption('[data-test="product-sort-container"]', option);
  }

  async addToCart(item: string) {
    await this.page.click(`[data-test="add-to-cart-${item}"]`);
  }

  async getCartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]').textContent();
  }

  async getFirstItemPrice() {
    return this.page.locator('.inventory_item_price').first().textContent();
  }

  async getLastItemPrice() {
    return this.page.locator('.inventory_item_price').last().textContent();
  }
}