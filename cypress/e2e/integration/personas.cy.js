import { visit } from '../../helpers/interactions/visit'

describe('check for personas page status', () => {
  beforeEach(() => {
    visit('/')
    // cy.click('button[data-cypress-id="language-switch-button-fr"]')
    cy.wait(1000)
    visit('/personas')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="personas-title"]').should('be.visible')
  })
})
