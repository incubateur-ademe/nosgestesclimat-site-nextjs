import { visit } from '../../../helpers/interactions/visit'

describe('check for personas page status', () => {
  beforeEach(() => {
    visit('/')
    cy.wait(1000)
    visit('/personas')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="personas-title"]').should('be.visible')
  })
})
