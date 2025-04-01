import 'cypress-axe'

export const checkA11y = () => {
  cy.injectAxe()
  cy.checkA11y()
}
