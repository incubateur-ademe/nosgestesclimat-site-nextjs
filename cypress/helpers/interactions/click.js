export async function click(elementId) {
  cy.get(`[data-cypress-id="${elementId}"]`).click()
}
