import { expect, test } from '@playwright/test'

test.describe('The Personas page', () => {
  test('has a title', async ({ page }) => {
    await page.goto('/personas')

    expect(page.locator('[data-cypress-id="personas-title"]')).toBeDefined()
  })
})
