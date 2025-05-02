export function click(elementId, options = {}) {
  cy.get(`[data-cypress-id="${elementId}"]`)
    .first()
    .should('be.visible')
    .click()
}
