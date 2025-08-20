import { expect, test } from '@playwright/test';
import { registerUser } from './utils/auth-helpers';

const userName = `testuser_${Date.now()}`;
const password = 'Welcome@123';

test('login user', async ({ page }) => {
  await page.goto('/');

  await registerUser(page, userName, password);
  
  await page.click('a:has-text("Login")');

  await page.waitForURL('/login');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="loginUserName"]').fill(userName);
  await page.locator('[name="loginPassword"]').fill(password);

  await page.click('button:has-text("Login")');

  await page.waitForURL('/user');
});
