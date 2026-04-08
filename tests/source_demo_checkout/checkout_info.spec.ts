import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';
import { CheckoutInfoPage } from './CheckoutInfoPage';

test.describe('User Story 4: Multi-Step Checkout Flow (Information Entry)', () => {
  test('Required Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout', async () => {
      await cartPage.goto();
      await cartPage.checkout();
    });
    await test.step('Try continue without filling', async () => {
      await checkoutInfoPage.continue();
    });
    await test.step('Verify required fields', async () => {
      const error = await checkoutInfoPage.getErrorMessage();
      expect(error).toContain('required');
    });
  });

  test('Input Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout', async () => {
      await cartPage.goto();
      await cartPage.checkout();
    });
    await test.step('Fill partial info', async () => {
      await checkoutInfoPage.fillInfo('John', '', '12345');
      await checkoutInfoPage.continue();
    });
    await test.step('Verify last name required', async () => {
      const error = await checkoutInfoPage.getErrorMessage();
      expect(error).toBe('Error: Last Name is required');
    });
  });

  test('Data Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout', async () => {
      await cartPage.goto();
      await cartPage.checkout();
    });
    await test.step('Fill valid info', async () => {
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await checkoutInfoPage.continue();
    });
    await test.step('Verify proceed to overview', async () => {
      await expect(page).toHaveURL(/checkout-step-two/);
    });
  });

  test('Cancellation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout', async () => {
      await cartPage.goto();
      await cartPage.checkout();
    });
    await test.step('Cancel', async () => {
      await checkoutInfoPage.cancel();
    });
    await test.step('Verify back to cart', async () => {
      await expect(page).toHaveURL(/cart/);
    });
  });
});