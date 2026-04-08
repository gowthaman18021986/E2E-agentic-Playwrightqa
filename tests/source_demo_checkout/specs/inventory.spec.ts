import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('User Story 2: Dynamic Product Sorting & Inventory Management', () => {
  test('Default Sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Verify default sort', async () => {
      const sortValue = await page.locator('[data-test="product-sort-container"]').inputValue();
      expect(sortValue).toBe('az');
    });
  });

  test('Price Sort Low to High', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Sort by price low to high', async () => {
      await inventoryPage.sortBy('lohi');
    });
    await test.step('Verify first item', async () => {
      const firstPrice = await inventoryPage.getFirstItemPrice();
      expect(firstPrice).toBe('$7.99');
    });
    await test.step('Verify last item', async () => {
      const lastPrice = await inventoryPage.getLastItemPrice();
      expect(lastPrice).toBe('$49.99');
    });
  });

  test('Add to Cart State Change', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Add item to cart', async () => {
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Verify button text', async () => {
      await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    });
    await test.step('Verify badge', async () => {
      const badge = await inventoryPage.getCartBadge();
      expect(badge).toBe('1');
    });
  });

  test('Cart Persistence', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await test.step('Login and add items', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
      await inventoryPage.addToCart('sauce-labs-bike-light');
    });
    await test.step('Refresh page', async () => {
      await page.reload();
    });
    await test.step('Verify badge persists', async () => {
      const badge = await inventoryPage.getCartBadge();
      expect(badge).toBe('2');
    });
  });
});