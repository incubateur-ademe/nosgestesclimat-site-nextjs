import { Page } from '@playwright/test'
import { clickDoTheTestLink, clickSkipTutorialButton } from '../elements/buttons'

export async function setupSimulation(page: Page): Promise<void> {
  await clickDoTheTestLink(page)
  await clickSkipTutorialButton(page)

  // Wait for the page to be redirected after skipping tutorial
  await page.waitForURL('**/simulateur/bilan')
}

