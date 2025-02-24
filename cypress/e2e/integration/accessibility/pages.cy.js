import 'cypress-axe'

// Define the pages to test
const pagesToTest = [
  // '/',
  // '/a-propos',
  '/blog',
  // '/blog/environnement',
  // '/blog/environnement/definition-empreinte-carbone',
  // '/nos-relais',
  // '/personas',
  // '/profil',
  // '/actions',
  // '/accessibilite',
  // '/diffuser',
  // '/international',
  // '/questions-frequentes',
  // '/organisations',
  // '/classements',
  // '/nouveautes',
  // '/nouveautes/thwaites',
  // '/politique-de-confidentialite',
  // '/stats',
  // '/modele',
  // '/documentation',
  // '/documentation/bilan',
  // '/actions/divers/partage-NGC',
]

Cypress.on('uncaught:exception', (err) => {
  return false
  // Enable uncaught exception failures for other errors
})

describe('Accessibility Tests', () => {
  pagesToTest.forEach((page) => {
    it(`Should have no accessibility violations on ${page}`, () => {
      cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      // Visit the page
      cy.visit(page)

      // Wait for the page to load completely
      cy.wait(2000)
      cy.injectAxe()

      // Run accessibility checks
      cy.checkA11y(
        // Context - the entire document
        'body',
        // Options
        {
          runOnly: {
            type: 'tag',
            values: [
              'wcag2a',
              'wcag2aa',
              'wcag21a',
              'wcag21aa',
              'best-practice',
            ],
          },
        }
      )
    })
  })
})
