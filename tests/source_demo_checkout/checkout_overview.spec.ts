import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';
import { CheckoutInfoPage } from './CheckoutInfoPage';
import { CheckoutOverviewPage } from './CheckoutOverviewPage';

test.describe('User Story 5: Order Finalization, Tax Calculation & Completion', () => {
  test('Calculation Logic', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout overview', async () => {
      await cartPage.goto();
      await cartPage.checkout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await checkoutInfoPage.continue();
    });
    await test.step('Verify item total', async () => {
      const itemTotal = await checkoutOverviewPage.getItemTotal();
      expect(itemTotal).toContain('$29.99');
    });
  });

  test('Tax Validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout overview', async () => {
      await cartPage.goto();
      await cartPage.checkout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await checkoutInfoPage.continue();
    });
    await test.step('Verify tax and total', async () => {
      const tax = await checkoutOverviewPage.getTax();
      const total = await checkoutOverviewPage.getTotal();
      expect(tax).toMatch(/\$[\d.]+/);
      expect(total).toMatch(/\$[\d.]+/);
    });
  });

  test('Order Submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await test.step('Login and add item', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
    });
    await test.step('Go to checkout overview', async () => {
      await cartPage.goto();
      await cartPage.checkout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await checkoutInfoPage.continue();
    });
    await test.step('Finish order', async () => {
      await checkoutOverviewPage.finish();
    });
    await test.step('Verify thank you page', async () => {
      const header = await checkoutOverviewPage.getCompleteHeader();
      expect(header).toBe('Thank you for your order!');
    });
  });

  test('Final Cleanup', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await test.step('Complete order', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addToCart('sauce-labs-backpack');
      await cartPage.goto();
      await cartPage.checkout();
      await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
      await checkoutInfoPage.continue();
      await checkoutOverviewPage.finish();
    });
    await test.step('Verify cart badge cleared', async () => {
      const badge = await inventoryPage.getCartBadge();
      expect(badge).toBeNull();
    });
  });
});