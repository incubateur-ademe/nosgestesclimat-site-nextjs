import { checkA11y } from '../../../helpers/accessibility/checkA11y'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'
describe('The simulation', () => {
  before(() => {
    cy.visit('/')

    setupSimulation()

    checkA11y()
  })

  it('can be finished with the default values', () => {
    recursivelyFillSimulation()
  })
})
