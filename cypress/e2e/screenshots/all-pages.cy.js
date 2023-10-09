describe('All pages', () => {
  it('should be screenshot', () => {
    cy.visit('/')

    cy.visit('/plan-du-site')

    cy.get('data-cypress-id="plan-links"').then((linksContainer) => {
      linksContainer.get('a').each((link) => {
        cy.visit(link.attr('href'))

        cy.wait(10000)

        cy.screenshot()
      })
    })
  })
})
