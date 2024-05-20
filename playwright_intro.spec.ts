import { test, expect } from '@playwright/test';

test('add item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
});

test('mark as complete', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Walk the dog');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.locator('li').filter({ hasText: 'Walk the dog' }).getByLabel('Toggle Todo').check();
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
});

test('delete item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Read a book');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(0);
});

test('edit item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Exercise');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByTestId('todo-title').click();
  await page.getByTestId('todo-title').dblclick();
  await page.getByLabel('Edit').fill('Morning Exercise');
  await page.getByLabel('Edit').press('Enter');
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
});

test('filter active', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('Task 1');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Task 2');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Task 3');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.locator('li').filter({ hasText: 'Task 2' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(2);
});