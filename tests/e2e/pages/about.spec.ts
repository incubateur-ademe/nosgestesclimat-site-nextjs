import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The À propos page', () => {
  test.beforeEach(async ({ page }) => {
    await visit(page, '/a-propos')
  })

  test('should render without breaking the app', async ({ page }) => {
    const expectedText = 'À propos'
    expect(page.locator(`text=${expectedText}`)).toBeDefined()
  })
})
