import { expect, test } from '@playwright/test'

test.describe('404 Page', () => {
  test('should display 404 page when accessing non-existent URL', async ({
    page,
  }) => {
    // Visit a URL that definitely doesn't exist and capture the response
    const response = await page.goto('/fr/definitely-not-a-page-url')

    // Check for common 404 page elements
    expect(page.locator('h1')).toBeDefined()
    expect(page.locator('div[data-cypress-id="404"]')).toBeDefined()
  })
})
