import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('404 Page', () => {
  test('should display 404 page when accessing non-existent URL', async ({
    page,
  }) => {
    // Handle uncaught exceptions
    page.on('pageerror', (error) => {
      if (error.message.includes('NEXT_NOT_FOUND')) {
        // Ignore NEXT_NOT_FOUND errors
        return
      }
      throw error
    })

    // Visit a URL that definitely doesn't exist
    await visit(page, '/definitely-not-a-page-url')

    // Verify that we're on the 404 page
    expect(page).toHaveURL(/.*\/404/)

    // Check for common 404 page elements
    expect(page.locator('h1')).toBeDefined()
    expect(page.locator('div[data-cypress-id="404"]')).toBeDefined()
  })
})
