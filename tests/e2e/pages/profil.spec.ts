import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Profil page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/profil')

    const testLangURL =
      process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
    const expectedText = testLangURL === 'en' ? 'My profile' : 'Mon profil'
    expect(page.locator('h1').filter({ hasText: expectedText })).toBeDefined()
  })
})
