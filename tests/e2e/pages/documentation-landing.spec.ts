import { test, expect } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Documentation landing page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/documentation')

    expect(page.locator('h1').filter({ hasText: 'Documentation' })).toBeDefined()
  })
})

