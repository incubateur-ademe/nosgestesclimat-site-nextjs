import { visit } from '../../../helpers/interactions/visit'

describe('The Ambassadeurs page', () => {
  it('has a title', () => {
    visit('ambassadeurs')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en' ? 'Ambassadors' : 'Ambassadeurs'
      )
      .should('be.visible')
  })
})
