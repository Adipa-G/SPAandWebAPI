import { expect, test } from '@playwright/test';

const userName = `testuser_${Date.now()}`;
const password = 'Welcome@123';

test('register user', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('a:has-text("Sign Up")', { state: 'visible' });
  await page.click('a:has-text("Sign Up")');
    
  await page.waitForURL('/#/signup');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="registrationUserName"]').fill(userName);
  await page.locator('[name="registrationPassword"]').fill(password);
  await page.locator('[name="registrationConfirmPassword"]').fill(password);

  await page.click('button:has-text("REGISTER")');

  await page.waitForSelector('.alert-success');
  await expect(page.locator('.alert-success')).toContainText('Registration successful!');
});
