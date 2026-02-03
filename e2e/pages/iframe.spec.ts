import { expect, test } from '@playwright/test'

test.describe('/demo-iframe.html', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-iframe.html')
  })

  test('displays the iframe correctly', ({ page }) => {
    const iframe = page.frameLocator('iframe').first()
    expect(iframe.getByTestId('do-the-test-link')).toBeDefined()
  })
})

test.describe('/demo-iframeSimulation.html', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-iframeSimulation.html')
  })

  test('displays the iframe correctly', ({ page }) => {
    const iframe = page.frameLocator('iframe').first()
    expect(iframe.getByTestId('skip-tutorial-button')).toBeDefined()
  })
})
