import { visit } from '../../../helpers/interactions/visit'

describe('The Documentation landing page', () => {
  it('should render without breaking the app', () => {
    visit('documentation')

    cy.get('h1').contains('Documentation').should('be.visible')
  })
})
