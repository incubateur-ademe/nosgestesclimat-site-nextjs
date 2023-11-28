import { visit } from '../../../helpers/interactions/visit'

describe('The Documentation landing page', () => {
  it('has a title', () => {
    visit('documentation')

    cy.get('h1').contains('Documentation').should('be.visible')
  })
})
