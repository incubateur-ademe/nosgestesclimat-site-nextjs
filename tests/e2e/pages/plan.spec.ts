import { test, expect } from '@playwright/test'
import {
  PLAN_ACTIONS_TITLE,
  PLAN_OUTILS_TITLE,
} from '../../constants/elements-ids'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Plan du site page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/plan-du-site')

    const testLangURL = process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
    const expectedText = testLangURL === 'en' ? 'Site map' : 'Plan du site'
    expect(page.locator('h1').filter({ hasText: expectedText })).toBeDefined()
  })

  test('should display hardcoded elements and dynamically generated elements (the actions list)', async ({
    page,
  }) => {
    await visit(page, '/plan-du-site')

    expect(page.locator(`h2[data-cypress-id="${PLAN_OUTILS_TITLE}"]`)).toBeDefined()

    expect(page.locator(`h2[data-cypress-id="${PLAN_ACTIONS_TITLE}"]`)).toBeDefined()
  })
})

