import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The International page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/international')

    const testLangURL =
      process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
    const expectedText =
      testLangURL === 'en'
        ? 'The international climate footprint calculator'
        : "Le calculateur d'empreinte climat international"
    expect(
      page.locator('h1').filter({ hasText: expectedText })
    ).toBeDefined()
  })
})
