import { visit } from '../../helpers/interactions/visit'

describe('check for personas page status', () => {
  beforeEach(() => {
    visit('/personas')
    cy.wait(3000)
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="personas-title"]').should('be.visible')
  })
})
