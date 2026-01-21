import { expect, test } from '@playwright/test'

test('should render without breaking the app', async ({ page }) => {
  await page.goto('/profil')

  expect(page.locator('h1').getByText('Mon profil')).toBeDefined()
})
