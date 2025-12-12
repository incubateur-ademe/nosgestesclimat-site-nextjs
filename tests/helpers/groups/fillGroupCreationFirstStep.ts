import type { Page } from '@playwright/test'

export async function fillGroupCreationFirstStep(page: Page): Promise<void> {
  await page
    .locator('input[data-cypress-id="group-input-owner-name"]')
    .waitFor({ state: 'visible' })
  await page
    .locator('input[data-cypress-id="group-input-owner-name"]')
    .fill('Jean-Marc')
  await page
    .locator('input[data-cypress-id="group-input-owner-email"]')
    .waitFor({ state: 'visible' })
  await page
    .locator('input[data-cypress-id="group-input-owner-email"]')
    .fill('jean@marc.com')
}
