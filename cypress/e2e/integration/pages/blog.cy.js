import { visit } from '../../../helpers/interactions/visit'

Cypress.on('uncaught:exception', (err) => {
  // Ignore uncaught exception failures for now
  return false
})

describe('The Blog page', { testIsolation: false }, () => {
  // it('should render without breaking the app', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   visit('blog')

  //   cy.get('h1').contains('Le blog').should('be.visible')
  // })

  // it('displays a list of articles, which are themselves displayed correctly', () => {
  //   cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

  //   cy.get('ul[data-cypress-id="blog-list"]').should('be.visible')

  //   cy.get('ul[data-cypress-id="blog-list"]  a').first().click()

  //   cy.wait(1000)

  //   cy.get('h1').should('be.visible')
  // })

  it('displays a list of categories, which are themselves displayed correctly', () => {
    cy.intercept({ resourceType: /xhr|fetch|uncaught/ }, { log: false })

    visit('blog')

    cy.get('ul[data-cypress-id="blog-categories-list"]').should('be.visible')

    const listOfCategories = cy.get(
      'ul[data-cypress-id="blog-categories-list"]  a'
    )

    // For each category, click on it and check that the page is not a 404
    listOfCategories.each(($el, index) => {
      // Click on the category based on the index
      cy.get('ul[data-cypress-id="blog-categories-list"]  a').eq(index).click()

      cy.wait(1000)

      cy.get('h1').not('404').should('be.visible')

      cy.visit('blog')
    })
  })
})
