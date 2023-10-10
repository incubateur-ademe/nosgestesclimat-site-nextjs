export function visit(page) {
  const url = Cypress.env('testLangURL')
    ? `/${Cypress.env('testLangURL')}/${page}`
    : `/${page}`

  cy.visit(url)
}
