import { visit } from '../../../helpers/interactions/visit'

describe('The Action page', { testIsolation: false }, () => {
  it('should render', () => {
    visit('actions')

    cy.get('h1')
      .contains(Cypress.env('testLangURL') === 'en' ? 'Act' : 'Agir')
      .should('be.visible')
  })
})
