import 'cypress-axe'

const dynamicPages = [
  '/actions',
  '/classements',
  '/profil',
  '/simulateur/bilan',
]

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  // it('Should have no accessibility violations on /simulateur/bilan', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/tutoriel')

  //   clickSkipTutorialButton()

  //   // Wait for the page to load completely
  //   cy.wait(2000)
  //   cy.injectAxe()

  //   // Run accessibility checks
  //   cy.checkA11y()
  // })

  // it('Should have no accessibility violations on /fin', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.visit('/')

  //   setupSimulation()

  //   recursivelyFillSimulation()

  //   cy.visit('/fin')

  //   cy.wait(2000)
  //   cy.injectAxe()

  //   // Run accessibility checks
  //   cy.checkA11y()
  // })

  it('Should have no accessibility violations on /amis', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    cy.visit('/amis')

    cy.wait(6000)

    cy.injectAxe()

    // Run accessibility checks
    cy.checkA11y()
  })

  //   dynamicPages.forEach((page) => {
  //     it(`Should have no accessibility violations on ${page}`, () => {
  //       cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //       // cy.viewport('iphone-6')

  //       // Visit the page
  //       cy.visit(page)

  //       // Wait for the page to load completely
  //       cy.wait(2000)
  //       cy.injectAxe()

  //       // Run accessibility checks
  //       cy.checkA11y()
  //     })
  //   })
})
