export function click(elementId) {
  cy.get(`[data-cypress-id="${elementId}"]`).click()
}
