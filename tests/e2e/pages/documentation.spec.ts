import { expect, test } from '@playwright/test'
import {
  DOCUMENTATION_LAUNCH_BUTTON,
  DOCUMENTATION_TITLE,
} from '../../constants/elements-ids'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Documentation page', () => {
  test('should render without breaking the app (server side rendered)', async ({
    page,
  }) => {
    await visit(page, '/documentation/bilan')

    expect(
      page.locator(`h1[data-cypress-id="${DOCUMENTATION_TITLE}"]`)
    ).toBeDefined()
  })

  test('should render the client side documentation upon click on the launch button', async ({
    page,
  }) => {
    await visit(page, '/documentation/bilan')

    await page
      .locator(`button[data-cypress-id="${DOCUMENTATION_LAUNCH_BUTTON}"]`)
      .click()

    expect(page.locator('div[id="documentation-rule-root"]')).toBeDefined()
  })
})
