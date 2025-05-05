export function visit(page) {
  const url = Cypress.env('testLangURL')
    ? `/${Cypress.env('testLangURL')}/${page}`
    : `/${page}`

  cy.visit(url)
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve()
      } else {
        win.addEventListener('load', resolve)
      }
    })
  })
}
