describe('All pages', () => {
  it('should be screenshot', () => {
    cy.visit('/')

    cy.wait(1000)

    cy.visit('/plan-du-site')

    cy.get('div[data-cypress-id="plan-links"]').then((linksContainer) => {
      linksContainer.get('a').each((link) => {
        cy.visit(link.attr('href'))

        cy.wait(10000)

        cy.screenshot()
      })
    })
  })
})
