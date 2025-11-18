import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The International page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/international')

    const expectedText = "Le calculateur d'empreinte climat international"
    expect(page.locator('h1').filter({ hasText: expectedText })).toBeDefined()
  })
})
