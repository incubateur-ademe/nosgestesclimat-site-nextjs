import { visit } from '../../../helpers/interactions/visit'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'
describe('The simulation', () => {
  before(() => {
    visit('/')

    setupSimulation()

    // checkA11y()  // TODO: fix A11Y test breaking only when running on CI
  })

  it('can be finished with the default values', () => {
    // Wait for the simulation to be properly initialized
    cy.url().should('include', '/simulateur/bilan')
    cy.get('body').should('be.visible')

    // Ensure we're on a simulation page with questions
    cy.get('input', { timeout: 10000 }).should('exist')

    recursivelyFillSimulation()
  })
})
