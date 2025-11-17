import { Page } from '@playwright/test'

export const dismissCookieBanner = async (page: Page): Promise<void> => {
  // Check if cookie banner exists without waiting for it
  const banner = page.locator('[data-testid="cookie-banner-title"]')
  const count = await banner.count()

  if (count > 0) {
    // If banner exists, wait for it to be visible and dismiss it
    await banner.waitFor({ state: 'visible' })
    const refuseButton = page.locator(
      '[data-testid="cookie-banner-refuse-button"]'
    )
    await refuseButton.waitFor({ state: 'visible' })
    await refuseButton.click()
  } else {
    // If no banner, just continue
    console.log('Cookie banner not present')
  }
}
