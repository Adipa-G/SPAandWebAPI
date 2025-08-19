import { Page, expect } from '@playwright/test';

export async function registerUser(page: Page, userName: string, password: string) {
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
}

export async function loginUser(page: Page, userName: string, password: string) {
  await page.click('a:has-text("Login")');

  await page.waitForURL('/#/login');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="loginUserName"]').fill(userName);
  await page.locator('[name="loginPassword"]').fill(password);

  await page.click('button:has-text("Login")');

  await page.waitForURL('/#/userList');
  await page.waitForSelector('form', { state: 'visible' });
}