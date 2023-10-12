describe('All pages', () => {
  it('should be screenshot', () => {
    cy.visit('/')

    cy.wait(1000)

    cy.visit('/plan-du-site')

    cy.wait(3000)

    cy.get('div[data-cypress-id="plan-links"]').then((linksContainer) => {
      const linksElements = linksContainer.find('a')
      const links = linksElements.map((index, link) => {
        return link.href
      })

      links.each((index, link) => {
        cy.visit(link)
          .wait(3000)
          .screenshot(
            '/all-pages/' +
              link.replace('http://localhost:3000/', '').replaceAll('/', '_')
          )
      })
    })
  })
})
