import { visit } from '../../../helpers/interactions/visit'

describe('The International page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('international')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en'
          ? 'The international climate footprint calculator'
          : 'Le calculateur d’empreinte climat international'
      )
      .should('be.visible')
  })
})
