import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('check for about page status', () => {
  test('displays at least one news title', async ({ page }) => {
    await visit(page, '/nouveautes')

    expect(page.locator('[data-cypress-id="news-title"]')).toBeDefined()
  })
})
