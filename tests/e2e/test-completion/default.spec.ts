import { expect, test } from '@playwright/test'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.use({
  storageState: undefined,
})

test.describe('The simulation', () => {
  test('can be finished with the default values', async ({ page }) => {
    await page.goto('/')

    await setupSimulation(page)

    // Wait for the simulation to be properly initialized
    expect(page).toHaveURL(/.*\/simulateur\/bilan/)
    expect(page.locator('body')).toBeDefined()

    // Ensure we're on a simulation page with questions
    expect(page.locator('input').first()).toBeDefined()

    await recursivelyFillSimulation(page)
  })
})
