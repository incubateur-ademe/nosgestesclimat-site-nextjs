import 'cypress-axe'
import { skipTutoIfExists } from '../../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  it('Should return no accessibility violations on /actions', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    // Actions when user hasn't completed the simulation
    cy.visit('/actions')

    cy.wait(2000)

    cy.injectAxe()

    cy.checkA11y()

    // Actions when user has completed the simulation
    cy.visit('/')

    setupSimulation()

    recursivelyFillSimulation()

    skipTutoIfExists()

    cy.wait(4000)

    cy.visit('/actions')

    cy.wait(2000)

    cy.injectAxe()

    cy.checkA11y()
  })
})
