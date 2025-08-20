import { expect, test } from '@playwright/test';
import { loginUser, registerUser } from './utils/auth-helpers';

const userName = `testuser_${Date.now()}`;
const password = 'Welcome@123';

test('shows users list', async ({ page }) => {
  await page.goto('/');

  await registerUser(page, userName, password);
  await loginUser(page, userName, password);

  await page.waitForURL('/user');
  
  var htmlContent = await page.content();
  expect(htmlContent).toContain(userName);
});
