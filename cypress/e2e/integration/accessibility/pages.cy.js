import 'cypress-axe'

// Define the pages to test
const pagesToTest = ['/']

describe('Accessibility Tests', () => {
  pagesToTest.forEach((page) => {
    it(`Should have no accessibility violations on ${page}`, () => {
      // Visit the page
      cy.visit(page)

      // Wait for the page to load completely
      cy.wait(2000)
      cy.injectAxe()

      // Run accessibility checks
      cy.checkA11y(
        // Context - the entire document
        'body',
        // Options
        {
          runOnly: {
            type: 'tag',
            values: [
              'wcag2a',
              'wcag2aa',
              'wcag21a',
              'wcag21aa',
              'best-practice',
            ],
          },
        }
      )
    })
  })
})
