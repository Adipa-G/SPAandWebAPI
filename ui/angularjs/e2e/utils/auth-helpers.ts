import { Page, expect } from '@playwright/test';

export async function registerUser(page: Page, userName: string, password: string) {
  await page.waitForSelector('a:has-text("Sign Up")', { state: 'visible' });
  await page.click('a:has-text("Sign Up")');
    
  await page.waitForURL('/signup');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="registrationUserName"]').fill(userName);
  await page.locator('[name="registrationPassword"]').fill(password);
  await page.locator('[name="registrationConfirmPassword"]').fill(password);

  await page.click('button:has-text("REGISTER")');

  await page.waitForSelector('.alert-success');
  await expect(page.locator('.alert-success')).toContainText('User has been registered successfully');
}

export async function loginUser(page: Page, userName: string, password: string) {
  await page.click('a:has-text("Login")');

  await page.waitForURL('/login');
  await page.waitForSelector('form', { state: 'visible' });

  await page.locator('[name="loginUserName"]').fill(userName);
  await page.locator('[name="loginPassword"]').fill(password);

  await page.click('button:has-text("Login")');

  await page.waitForURL('/user');
}