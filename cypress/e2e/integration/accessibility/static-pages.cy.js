import 'cypress-axe'

// Define the pages to test
const staticPagesToTest = [
  '/',
  '/a-propos',
  '/blog',
  '/blog/environnement',
  '/blog/environnement/definition-empreinte-carbone', // image alt are redundant
  '/nos-relais',
  '/personas',
  '/accessibilite',
  '/diffuser',
  '/international',
  '/questions-frequentes',
  '/organisations',
  '/nouveautes',
  '/nouveautes/thwaites',
  '/politique-de-confidentialite',
  '/politique-des-cookies',
  '/mentions-legales', // link on telephone number
  '/stats', // Fails : selects lack accessible labels
  '/modele',
  '/documentation',
  '/documentation/bilan', // heading order
  '/actions',
  '/actions/divers/partage-NGC',
  '/profil',
]

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Accessibility Tests', () => {
  staticPagesToTest.forEach((page) => {
    it(`Should have no accessibility violations on ${page} on mobile`, () => {
      cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      cy.viewport('iphone-6')

      // Visit the page
      cy.visit(page)

      // Wait for the page to load completely
      cy.wait(2000)
      cy.injectAxe()

      // Run accessibility checks
      cy.checkA11y({
        exclude: [
          '.splide', // false positive ; allowed-role
          '.skip-to-main-content', // false positive ; skip-link : Ensure all skip links have a focusable target
        ],
      })
    })

    it(`Should have no accessibility violations on ${page} on desktop`, () => {
      cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      // Visit the page
      cy.visit(page)

      // Wait for the page to load completely
      cy.wait(2000)
      cy.injectAxe()

      // Run accessibility checks
      cy.checkA11y([
        '.splide', // false positive ; allowed-role
        '.skip-to-main-content', // false positive ; skip-link : Ensure all skip links have a focusable target
      ])
    })
  })
})
