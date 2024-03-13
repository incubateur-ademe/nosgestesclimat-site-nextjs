import { visit } from '../../../helpers/interactions/visit'

describe('The Fin page', () => {
  it('should redirect to the tutorial when no simulation exists', () => {
    visit('fin')

    cy.get('h1[data-cypress-id="tutoriel-title"]').should('be.visible')
  })
})
