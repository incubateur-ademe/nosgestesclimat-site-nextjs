import { visit } from '../../../helpers/interactions/visit'

describe('The Blog page', { testIsolation: false }, () => {
  it('should render without breaking the app', () => {
    visit('blog')

    cy.get('h1').contains('Blog').should('be.visible')
  })

  it('displays a list of articles, which are themselves displayed correctly', () => {
    cy.get('ul[data-cypress-id="blog-list"]').should('be.visible')

    cy.get('ul[data-cypress-id="blog-list"] > a').first().click()

    cy.wait(1000)

    cy.get('h1').should('be.visible')
  })
})
