import { Page } from '@playwright/test'

export async function clickValidateGroupCreation(page: Page): Promise<void> {
  await page
    .locator('[data-cypress-id="button-validate-create-group"]')
    .waitFor({ state: 'visible' })
  await page.locator('[data-cypress-id="button-validate-create-group"]').click()
}

