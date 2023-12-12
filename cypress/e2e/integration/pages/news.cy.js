import { visit } from '../../../helpers/interactions/visit'

describe('check for about page status', () => {
  it('displays at least one news title', () => {
    visit('nouveautes')

    cy.get('[data-cypress-id="news-title"]').should('be.visible')
  })
})
