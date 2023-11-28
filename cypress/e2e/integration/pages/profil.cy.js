import { visit } from '../../../helpers/interactions/visit'

describe('The Profil page', { testIsolation: false }, () => {
  it('has a title', () => {
    visit('profil')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en' ? 'My profile' : 'Mon profil'
      )
      .should('be.visible')
  })
})
