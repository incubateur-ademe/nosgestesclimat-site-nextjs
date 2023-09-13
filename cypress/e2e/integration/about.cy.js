import { visit } from '../utils.js'

describe('check for about page status', () => {
  beforeEach(() => {
    visit('a-propos')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="about-us-title"]').should('be.visible')
  })
})
