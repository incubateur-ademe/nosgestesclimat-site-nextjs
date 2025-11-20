import { expect, test } from '@playwright/test'

test.describe('Our iframe demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-iframe.html')
  })

  test('displays the iframe correctly', async ({ page }) => {
    const iframe = page.frameLocator('iframe').first()
    expect(iframe.locator('[data-cypress-id="do-the-test-link"]')).toBeDefined()
  })
})

test.describe('Our iframe simulation demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-iframeSimulation.html')
  })

  test('displays the iframe correctly', async ({ page }) => {
    const iframe = page.frameLocator('iframe').first()
    expect(
      iframe.locator('[data-cypress-id="skip-tutorial-button"]')
    ).toBeDefined()
  })
})
