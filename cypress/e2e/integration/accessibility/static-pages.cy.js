import 'cypress-axe'
import { checkA11y } from '../../../helpers/accessibility/checkA11y'
import { dismissCookieBanner } from '../../../helpers/cookies/dismissCookieBanner'
import { visit } from '../../../helpers/interactions/visit'

// Define the pages to test
const staticPagesToTest = [
  '/',
  '/a-propos',
  '/blog',
  '/blog/environnement',
  // '/blog/environnement/definition-empreinte-carbone', // TODO: impact CO2 button breaking
  '/nos-relais',
  // '/personas', // TODO: fix A11Y test breaking only when running on CI
  '/accessibilite',
  '/diffuser',
  '/international',
  '/questions-frequentes',
  // '/organisations', // TODO: fix A11Y test breaking only when running on CI
  '/nouveautes',
  '/nouveautes/thwaites',
  '/politique-de-confidentialite',
  '/politique-des-cookies',
  '/mentions-legales',
  // '/stats', // TODO: fix A11Y test breaking RANDOMLY when running on CI
  '/modele',
  // '/documentation', // TODO: fix A11Y test breaking RANDOMLY when running on CI
  '/documentation/bilan',
  // '/actions', // TODO: fix A11Y test breaking only when running on CI
  // '/actions/divers/partage-NGC', // TODO: fix A11Y test breaking only when running on CI
  // '/profil', // TODO: fix A11Y test breaking only when running on CI
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
      visit(page)

      // Wait for the page to load completely
      cy.wait(800)
      cy.injectAxe()

      // Run accessibility checks
      checkA11y()

      dismissCookieBanner()

      // Run accessibility checks after dismissing the cookie banner
      checkA11y()
    })

    it(`Should have no accessibility violations on ${page} on desktop`, () => {
      cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

      // Visit the page
      visit(page)

      // Wait for the page to load completely
      cy.wait(800)
      cy.injectAxe()

      // Run accessibility checks
      checkA11y()
    })
  })
})
