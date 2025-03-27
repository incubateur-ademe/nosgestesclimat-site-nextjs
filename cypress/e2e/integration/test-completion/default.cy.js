import { checkA11y } from '../../../helpers/misc/checkA11y'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'
describe('The simulation', () => {
  before(() => {
    cy.visit('/')

    setupSimulation()

    // checkA11y()  // TODO: fix A11Y test breaking only when running on CI
  })

  it('can be finished with the default values', () => {
    recursivelyFillSimulation()
  })
})
