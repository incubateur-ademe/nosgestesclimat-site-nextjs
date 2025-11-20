import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'

test.use({
  storageState: undefined,
})

test.describe('The Blog page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await page.goto('/blog')

    expect(page.locator('h1').filter({ hasText: 'Le blog' })).toBeDefined()
  })

  test('displays a list of articles, which are themselves displayed correctly', async ({
    page,
  }) => {
    await page.goto('/blog')

    await dismissCookieBanner(page)

    expect(page.locator('ul[data-cypress-id="blog-list"]')).toBeDefined()

    await page.locator('ul[data-cypress-id="blog-list"] a').first().click()

    expect(page.locator('h1')).toBeDefined()
  })
})
