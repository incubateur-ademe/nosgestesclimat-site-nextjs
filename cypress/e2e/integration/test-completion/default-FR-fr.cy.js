import { visit } from '../../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

describe('The simulation', () => {
  before(() => {
    visit(`/?loc=${Cypress.env('localisation_param')}`)

    setupSimulation()
  })

  it('can be finished with the default values and with loc=FR and lang=fr', () => {
    recursivelyFillSimulation()
  })
})
