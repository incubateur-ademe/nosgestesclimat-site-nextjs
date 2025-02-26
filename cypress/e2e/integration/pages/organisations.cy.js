import { visit } from '../../../helpers/interactions/visit'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('Organisations', { testIsolation: false }, () => {
  describe('Landing page', () => {
    it('should render without breaking the app', () => {
      visit('organisations')

      cy.get('h1').not('404').should('be.visible')
    })
  })

  describe('As a user', () => {
    it('should be able to create an organisation', () => {
      visit('organisations')

      cy.get('[data-cypress-id="organisations-start-button"]').click()

      cy.wait(2000)

      cy.get('input[data-cypress-id="organisations-email-input"]').clear()
      cy.get('input[data-cypress-id="organisations-email-input"]').type(
        'test@test.com'
      )

      cy.get('[data-cypress-id="organisations-email-submit-button"]').click()
    })
  })
})
