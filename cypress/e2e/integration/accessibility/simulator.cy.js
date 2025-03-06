import 'cypress-axe'
import { clickSkipTutorialButton } from '../../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  it('Should return no accessibility violations on /simulateur/bilan', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/tutoriel')

    clickSkipTutorialButton()

    // Wait for the page to load completely
    cy.wait(2000)
    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })

  it('Should return no accessibility violations on /fin', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/')

    setupSimulation()

    recursivelyFillSimulation()

    cy.visit('/fin')

    cy.wait(2000)
    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })
})
