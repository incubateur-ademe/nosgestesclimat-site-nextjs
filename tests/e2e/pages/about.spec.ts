import { test, expect } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The À propos page', () => {
  test.beforeEach(async ({ page }) => {
    await visit(page, '/a-propos')
  })

  test('should render without breaking the app', async ({ page }) => {
    const testLangURL = process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
    const expectedText = testLangURL === 'en' ? 'About us' : 'À propos'
    expect(page.locator(`text=${expectedText}`)).toBeDefined()
  })
})

