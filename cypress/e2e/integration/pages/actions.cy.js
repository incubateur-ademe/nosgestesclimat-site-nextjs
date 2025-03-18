import 'cypress-axe'
import { skipTutoIfExists } from '../../../helpers/elements/buttons'
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
  })
})
