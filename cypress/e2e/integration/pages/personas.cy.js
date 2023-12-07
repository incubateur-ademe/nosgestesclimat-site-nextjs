import { visit } from '../../../helpers/interactions/visit'

describe('The Personas page', () => {
  it('has a title', () => {
    visit('personas')

    cy.get('[data-cypress-id="personas-title"]').should('be.visible')
  })
})
