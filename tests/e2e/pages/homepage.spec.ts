import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'

test.describe('check for homepage status', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await dismissCookieBanner(page)
  })

  test('has a start button', async ({ page }) => {
    expect(page.locator('[data-cypress-id="do-the-test-link"]')).toBeDefined()
  })
})
