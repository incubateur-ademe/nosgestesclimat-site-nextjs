import 'cypress-axe'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  it('Should return no accessibility violations on /classements', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/classements')

    cy.wait(8000)

    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })

  it('Should return no accessibility violations on the /amis userflow', () => {
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
})
