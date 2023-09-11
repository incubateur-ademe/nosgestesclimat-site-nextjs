describe('check for about page status', () => {
  beforeEach(() => {
    cy.visit('/nouveautes')
  })

  it('has a title', () => {
    cy.get('[data-cypress-id="news-title"]').should('be.visible')
  })
})
