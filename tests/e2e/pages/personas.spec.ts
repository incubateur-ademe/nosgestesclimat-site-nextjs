import { expect, test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Personas page', () => {
  test('has a title', async ({ page }) => {
    await visit(page, '/personas')

    expect(page.locator('[data-cypress-id="personas-title"]')).toBeDefined()
  })
})
