import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Accessibilité page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/accessibilite')

    const expectedText = 'Accessibilité'
    expect(page.locator(`text=${expectedText}`)).toBeDefined()
  })
})
