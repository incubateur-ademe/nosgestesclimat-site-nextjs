describe('check for group page status', () => {
  beforeEach(() => {
    cy.visit('https://sondages.nosgestesclimat.fr')
    cy.wait(3000)
  })

  it('has a start button', () => {
    cy.get('[data-cypress-id="group-start-button"]').should('be.visible')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="group-title"]').should('be.visible')
  })
})
