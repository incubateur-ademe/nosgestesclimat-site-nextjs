import { visit } from '../utils.js'

describe('check for about page status', () => {
  beforeEach(() => {
    visit('a-propos')
  })

  it('has a title', () => {
    cy.contains(
      Cypress.env('testLangURL') === 'en' ? 'About us' : 'À propos'
    ).should('be.visible')
  })
})
