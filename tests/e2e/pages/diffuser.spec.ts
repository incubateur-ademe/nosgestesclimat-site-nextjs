import { test, expect } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'

test.describe('The Diffuser NGC page', () => {
  test('should render without breaking the app', async ({ page }) => {
    await visit(page, '/diffuser')

    expect(page.locator('h1').filter({ hasText: 'Diffuser Nos Gestes Climat' })).toBeDefined()
  })
})

