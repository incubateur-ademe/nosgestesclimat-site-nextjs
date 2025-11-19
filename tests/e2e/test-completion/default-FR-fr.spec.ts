import { test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.use({
  storageState: undefined,
})

test.describe('The simulation', () => {
  test('can be finished with the default values and with loc=FR and lang=fr', async ({
    page,
  }) => {
    await visit(page, '/')
    await setupSimulation(page)
    await recursivelyFillSimulation(page)
  })
})
