import { expect, test } from '@playwright/test'

test.describe('The Profil page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await page.goto('/profil')

    const expectedText = 'Mon profil'
    expect(page.locator('h1').filter({ hasText: expectedText })).toBeDefined()
  })
})
