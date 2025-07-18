import 'cypress-axe'
import { checkA11y } from '../../../helpers/accessibility/checkA11y'
import { dismissCookieBanner } from '../../../helpers/cookies/dismissCookieBanner'
import { recursivelyFillSimulation } from '../../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Action userflow', () => {
  describe('Given a user', () => {
    describe('When he visits the actions page after completing the simulation', () => {
      it('Then it should display correctly and return no accessibility violations', () => {
        cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

        // Actions when user hasn't completed the simulation
        cy.visit('/actions')

        cy.wait(2000)

        dismissCookieBanner()

        cy.get('h1')
          .contains(
            Cypress.env('testLangURL') === 'en' ? 'My gestures' : 'Mes gestes'
          )
          .should('be.visible')

        // Actions when user has completed the simulation
        cy.visit('/')

        setupSimulation()

        recursivelyFillSimulation()

        cy.wait(4000)

        cy.visit('/actions')

        cy.wait(2000)

        cy.get('h1')
          .contains(
            Cypress.env('testLangURL') === 'en' ? 'My gestures' : 'Mes gestes'
          )
          .should('be.visible')

        checkA11y()
      })
    })
  })
})
