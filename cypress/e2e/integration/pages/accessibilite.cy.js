import { visit } from '../../../helpers/interactions/visit'

describe('The Accessibilité page', () => {
  it('should render without breaking the app', () => {
    visit('accessibilite')

    cy.contains(
      Cypress.env('testLangURL') === 'en' ? 'Accessibility' : 'Accessibilité'
    ).should('be.visible')
  })
})
