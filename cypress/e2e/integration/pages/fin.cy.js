import { visit } from '../../../helpers/interactions/visit'

describe('The Fin page', () => {
  it('should render without breaking the app', () => {
    visit('fin')

    cy.get('h1[data-cypress-id="fin-title"]').should('be.visible')
  })
})
