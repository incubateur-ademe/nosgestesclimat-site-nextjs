import { Page } from '@playwright/test'

export async function click(page: Page, elementId: string): Promise<void> {
  const locator = page.locator(`[data-cypress-id="${elementId}"]`).first()
  await locator.waitFor({ state: 'visible', timeout: 10000 })
  await locator.click()
}
