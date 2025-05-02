export function click(elementId) {
  cy.get(`[data-cypress-id="${elementId}"]`).should('be.visible')
  cy.get(`[data-cypress-id="${elementId}"]`).first().click()
}
