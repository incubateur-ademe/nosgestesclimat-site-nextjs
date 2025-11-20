import { Page } from '@playwright/test'

export async function isMosaicQuestion(page: Page): Promise<boolean> {
  const element = page.locator('[data-cypress-id="mosaic-question"]')
  const count = await element.count()
  return count > 0
}
