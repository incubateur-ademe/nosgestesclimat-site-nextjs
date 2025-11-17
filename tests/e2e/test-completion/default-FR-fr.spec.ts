import { test } from '@playwright/test'
import { visit } from '../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

test.describe('The simulation', () => {
  test('can be finished with the default values and with loc=FR and lang=fr', async ({
    page,
  }) => {
    const localisationParam = process.env.localisation_param || 'FR'
    await visit(page, `/?loc=${localisationParam}`)
    await setupSimulation(page)
    await recursivelyFillSimulation(page)
  })
})

