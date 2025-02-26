import 'cypress-axe'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  it('Should have no accessibility violations on /simulateur/bilan', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/tutoriel')

    clickSkipTutorialButton()

    // Wait for the page to load completely
    cy.wait(2000)
    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })

  it('Should have no accessibility violations on /fin', () => {
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

  it('Should have no accessibility violations on /classements', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/classements')

    cy.wait(8000)

    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })

  it('Should have no accessibility violations on the /amis userflow', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/amis/creer/vos-informations')

    // Run accessibility checks on first step
    cy.injectAxe()

    cy.checkA11y()

    fillGroupCreationFirstStep()

    clickNextStepGroupCreation()

    cy.wait(2000)

    // Run accessibility checks on second step
    cy.injectAxe()

    cy.checkA11y()

    fillGroupNameEmoji()

    clickValidateGroupCreation()

    cy.wait(2000)

    clickSkipTutorialButton()

    recursivelyFillSimulation()

    cy.wait(4000)

    skipRiddle()

    cy.wait(4000)

    // Run accessibility checks on group results page
    cy.injectAxe()

    cy.checkA11y()

    cy.wait(2000)

    cy.clearLocalStorage()
    cy.reload()

    cy.wait(7000)

    // Run accessibility checks on group results page
    cy.injectAxe()

    cy.checkA11y()
  })

  it('Should have no accessibility violations on /actions', () => {
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

    cy.wait(4000)

    cy.visit('/actions')

    cy.wait(2000)

    cy.injectAxe()

    cy.checkA11y()
  })
})
