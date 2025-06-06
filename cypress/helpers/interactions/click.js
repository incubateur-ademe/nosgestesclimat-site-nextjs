export function click(elementId) {
  cy.get(`[data-cypress-id="${elementId}"]`).should('be.visible', {
    timeout: 10000,
  })
  cy.get(`[data-cypress-id="${elementId}"]`).first().click()
}
