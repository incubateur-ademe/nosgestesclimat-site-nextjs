import { Page } from '@playwright/test'
import { AMIS_LINK } from '../../constants/elements-ids'

export async function clickAmisLink(page: Page): Promise<void> {
  await page
    .locator(`[data-cypress-id="${AMIS_LINK}"]`)
    .nth(1)
    .waitFor({ state: 'visible' })
  await page.locator(`[data-cypress-id="${AMIS_LINK}"]`).nth(1).click()
}
