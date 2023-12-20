import { visit } from '../../../helpers/interactions/visit'

describe('The Profil page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('profil')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en' ? 'My profile' : 'Mon profil'
      )
      .should('be.visible')
  })
})
