import type { Page } from '@playwright/test'
import {
  DO_THE_TEST_LINK,
  SKIP_TUTORIAL_BUTTON,
} from '../../constants/elements-ids'

export async function setupSimulation(page: Page): Promise<void> {
  await page.locator(`[data-cypress-id="${DO_THE_TEST_LINK}"]`).first().click()

  await page.waitForLoadState('networkidle')

  await page
    .locator(`[data-cypress-id="${SKIP_TUTORIAL_BUTTON}"]`)
    .first()
    .click()

  // Wait for the page to be redirected after skipping tutorial
  await page.waitForURL('**/simulateur/bilan')
}
