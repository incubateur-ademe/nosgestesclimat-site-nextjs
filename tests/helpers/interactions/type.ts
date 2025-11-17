import { Page } from '@playwright/test'

export async function type(page: Page, elementId: string, text: string): Promise<void> {
  const locator = page.locator(`[data-cypress-id="${elementId}"]`).first()
  await locator.waitFor({ state: 'visible' })
  await locator.fill(text)
}

