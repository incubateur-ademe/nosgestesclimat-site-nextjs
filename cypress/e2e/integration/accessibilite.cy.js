import { visit } from '../utils.js'

describe('check for about page status', () => {
  beforeEach(() => {
    visit('accessibilite')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="accessibility-statement-title"]').should(
      'be.visible'
    )
  })
})
