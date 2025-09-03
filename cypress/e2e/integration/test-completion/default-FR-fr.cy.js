import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

describe('The simulation', () => {
  before(() => {
    cy.visit(
      `/?loc=${Cypress.env('localisation_param')}&lang=${Cypress.env(
        'language_param'
      )}`
    )

    setupSimulation()
  })

  it('can be finished with the default values and with loc=FR and lang=fr', () => {
    recursivelyFillSimulation()
  })
})
