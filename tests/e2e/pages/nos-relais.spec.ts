import { test, expect } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The page relays', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/nos-relais')

    const testLangURL = process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
    const expectedText =
      testLangURL === 'en' ? 'They relay Nos Gestes Climat' : 'Ils relaient Nos Gestes Climat'
    expect(page.locator('h1').filter({ hasText: expectedText })).toBeDefined()
  })
})

