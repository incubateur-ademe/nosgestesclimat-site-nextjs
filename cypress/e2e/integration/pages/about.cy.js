import { visit } from '../../../helpers/interactions/visit'

describe('The À propos page', () => {
  beforeEach(() => {
    visit('a-propos')
  })

  it('should render without breaking the app', () => {
    cy.contains(
      Cypress.env('testLangURL') === 'en' ? 'About us' : 'À propos'
    ).should('be.visible')
  })
})
