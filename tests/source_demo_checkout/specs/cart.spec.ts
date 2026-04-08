import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('User Story 3: Comprehensive Cart Review & Item Persistence', () => {
  test('Inventory Sync', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await test.step('Login and add items', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to cart', async () => {
      await cartPage.goto();
    });
    await test.step('Verify items', async () => {
      const names = await cartPage.getItemNames();
      expect(names).toContain('Sauce Labs Backpack');
    });
  });

  test('Item Removal', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to cart and remove', async () => {
      await cartPage.goto();
      await cartPage.removeItem('sauce-labs-backpack');
    });
    await test.step('Verify badge decremented', async () => {
      const badge = await cartPage.getCartBadge();
      expect(badge).toBeNull();
    });
  });

  test('Continue Shopping', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to cart and continue shopping', async () => {
      await cartPage.goto();
      await cartPage.continueShopping();
    });
    await test.step('Verify back to inventory', async () => {
      await expect(page).toHaveURL(/inventory/);
    });
    await test.step('Verify items remain', async () => {
      const badge = await inventoryPage.getCartBadge();
      expect(badge).toBe('1');
    });
  });

  test('Zero State', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await test.step('Login and add then remove all items', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
      await cartPage.goto();
      await cartPage.removeItem('sauce-labs-backpack');
    });
    await test.step('Verify badge hidden', async () => {
      const badge = await cartPage.getCartBadge();
      expect(badge).toBeNull();
    });
  });
});