import { expect, test } from '@playwright/test'

test.describe('404 Page', () => {
  test('should display 404 page when accessing non-existent URL', async ({
    page,
  }) => {
    // Visit a URL that doesn't exist
    await page.goto('/definitely-not-a-page-url')

    // Check for common 404 page elements
    expect(page.locator('h1')).toBeDefined()
    expect(page.locator('div[data-cypress-id="404"]')).toBeDefined()
  })
})
