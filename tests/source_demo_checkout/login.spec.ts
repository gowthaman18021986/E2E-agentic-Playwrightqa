import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test.describe('User Story 1: Secure Authentication & Session Persistence', () => {
  test('Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });
    await test.step('Login with valid credentials', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Verify redirect to inventory', async () => {
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test('Field Validation (Password Empty)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });
    await test.step('Attempt login without password', async () => {
      await loginPage.login('standard_user', '');
    });
    await test.step('Verify error message', async () => {
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Password is required');
    });
  });

  test('Account Security (Locked User)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });
    await test.step('Attempt login with locked user', async () => {
      await loginPage.login('locked_out_user', 'secret_sauce');
    });
    await test.step('Verify lockout error', async () => {
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('user is locked out');
    });
  });

  test('Session Termination', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Login successfully', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Logout', async () => {
      await loginPage.logout();
    });
    await test.step('Verify redirect to login', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    await test.step('Verify back button blocked', async () => {
      await page.goBack();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });
});