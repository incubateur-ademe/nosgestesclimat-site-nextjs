import { expect, test } from '@playwright/test'

test.describe('check for about page status', () => {
  test('displays at least one news title', async ({ page }) => {
    await page.goto('/nouveautes')

    expect(page.locator('[data-cypress-id="news-title"]')).toBeDefined()
  })
})
