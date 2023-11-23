export function click(elementId, options = {}) {
  cy.get(`[data-cypress-id="${elementId}"]`).first().click()
}
