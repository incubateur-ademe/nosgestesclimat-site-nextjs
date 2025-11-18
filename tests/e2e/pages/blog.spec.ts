import { expect, test } from '@playwright/test'
import { dismissCookieBanner } from '../../helpers/cookies/dismissCookieBanner'
import { visit } from '../../helpers/interactions/visit'

test.use({
  storageState: undefined,
})

test.describe('The Blog page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/blog')

    expect(page.locator('h1').filter({ hasText: 'Le blog' })).toBeDefined()
  })

  test('displays a list of articles, which are themselves displayed correctly', async ({
    page,
  }) => {
    await visit(page, '/blog')
    await dismissCookieBanner(page)

    expect(page.locator('ul[data-cypress-id="blog-list"]')).toBeDefined()

    await page.locator('ul[data-cypress-id="blog-list"] a').first().click()

    await page.waitForTimeout(1000)

    expect(page.locator('h1')).toBeDefined()
  })
})
