import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

describe('The simulation', () => {
  before(() => {
    cy.visit('/')

    setupSimulation()
  })

  it('can be finished with the default values', () => {
    recursivelyFillSimulation()
  })
})
