import { expect, test } from '@playwright/test';

const userName = `testuser_${Date.now()}`;
const password = 'Welcome@123';

test('register user', async ({ page }) => {
  await page.goto('/');

  page.on('framenavigated', async () => {
    console.log('Navigation occurred:', await page.url());
  });

  await page.waitForSelector('a:has-text("Sign Up")', { state: 'visible' });
  await page.click('a:has-text("Sign Up")');
    
  await page.waitForURL('/#/register');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="regUserName"]').fill(userName);
  await page.locator('[name="regPassword"]').fill(password);
  await page.locator('[name="regConfirmPassword"]').fill(password);

  await page.click('button:has-text("Sign Up")');

  await page.waitForSelector('.alert-success');
  await expect(page.locator('.alert-success')).toContainText('Registration successful!');
});
