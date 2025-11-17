import { test, expect } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.describe('The simulation', () => {
  test('can be finished with the default values', async ({ page }) => {
    await visit(page, '/')

    await setupSimulation(page)

    // Wait for the simulation to be properly initialized
    expect(page).toHaveURL(/.*\/simulateur\/bilan/)
    expect(page.locator('body')).toBeDefined()

    // Ensure we're on a simulation page with questions
    expect(page.locator('input').first()).toBeDefined({ timeout: 10000 })

    await recursivelyFillSimulation(page)
  })
})

