import 'cypress-axe'

export const checkA11y = () => {
  cy.injectAxe()

  cy.checkA11y({
    exclude: [
      '.splide', // false positive ; allowed-role
      '.skip-to-main-content', // false positive ; skip-link : Ensure all skip links have a focusable target
    ],
  })
}
