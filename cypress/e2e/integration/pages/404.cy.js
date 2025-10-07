import { visit } from '../../../helpers/interactions/visit'

describe('404 Page', () => {
  it('should display 404 page when accessing non-existent URL', () => {
    // Intercept and handle the Next.js not found error
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('NEXT_NOT_FOUND')) {
        return false
      }
    })

    // Visit a URL that definitely doesn't exist
    visit('definitely-not-a-page-url', { failOnStatusCode: false })

    // Verify that we're on the 404 page
    cy.url().should('include', '/404')

    // Check for common 404 page elements
    cy.get('h1').should('exist')
    cy.get('div[data-cypress-id="404"]').should('exist')
  })
})
