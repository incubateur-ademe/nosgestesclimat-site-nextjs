import { visit } from '../../../helpers/interactions/visit'

describe('The Action page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('actions')

    cy.get('h1')
      .contains(
        Cypress.env('testLangURL') === 'en' ? 'My gestures' : 'Mes gestes'
      )
      .should('be.visible')
  })
})
