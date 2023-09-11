import { visit } from '../utils.js'

describe('check for about page status', () => {
  beforeEach(() => {
    visit('nouveautes')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="news-title"]').should('be.visible')
  })
})
