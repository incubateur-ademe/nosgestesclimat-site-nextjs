import { expect, test } from '@playwright/test'

test.describe('The Documentation landing page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await page.goto('/documentation')

    expect(
      page.locator('h1').filter({ hasText: 'Documentation' })
    ).toBeDefined()
  })
})
