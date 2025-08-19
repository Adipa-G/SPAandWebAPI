import { expect, test } from '@playwright/test';
import { loginUser, registerUser } from './utils/auth-helpers';

const userName = `testuser_${Date.now()}`;
const password = 'Welcome@123';

test('shows system log', async ({ page }) => {
  await page.goto('/');

  await registerUser(page, userName, password);
  await loginUser(page, userName, password);

  await page.waitForURL('/#/userList');

  await page.click('a:has-text("System Log")');
  await page.waitForURL('/#/logMessages');
  
  var htmlContent = await page.content();
  expect(htmlContent).toContain('OpenIddict.Validation.AspNetCore was successfully authenticated');
});
