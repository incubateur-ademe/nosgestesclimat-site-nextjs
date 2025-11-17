import { Page } from '@playwright/test'

export async function waitWhileLoading(page: Page): Promise<void> {
  const loader = page.locator('[data-cypress-id="loader"]')
  const count = await loader.count()
  if (count > 0) {
    // Waiting for rules parsing
    await page.waitForTimeout(4000)
  }
}

