import { Page } from '@playwright/test'

export async function clickNextStepGroupCreation(page: Page): Promise<void> {
  await page
    .locator('[data-cypress-id="button-continue-create-group"]')
    .waitFor({ state: 'visible' })
  await page.locator('[data-cypress-id="button-continue-create-group"]').click()
}

