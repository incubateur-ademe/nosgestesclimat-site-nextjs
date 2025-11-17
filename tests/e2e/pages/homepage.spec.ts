import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('check for homepage status', () => {
  test.beforeEach(async ({ page }) => {
    await visit(page, '/')
  })

  test('has a start button', async ({ page }) => {
    expect(page.locator('[data-cypress-id="do-the-test-link"]')).toBeDefined()
  })
})
