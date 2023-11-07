import { visit } from '../../../helpers/interactions/visit'

describe('check for about page status', () => {
  beforeEach(() => {
    visit('accessibilite')
  })

  it('has a title', () => {
    cy.contains(
      Cypress.env('testLangURL') === 'en' ? 'Accessibility' : 'Accessibilité'
    ).should('be.visible')
  })
})
