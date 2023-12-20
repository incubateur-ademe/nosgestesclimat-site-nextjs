import { visit } from '../../../helpers/interactions/visit'

describe('The Action page', () => {
  it('should render without breaking the app', () => {
    visit('actions')

    cy.get('h1')
      .contains(Cypress.env('testLangURL') === 'en' ? 'Act' : 'Agir')
      .should('be.visible')
  })
})
