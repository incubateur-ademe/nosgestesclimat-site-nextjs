export function type(elementId, text) {
  cy.get(`[data-cypress-id="${elementId}"]`)
    .first()
    .should('be.visible')
    .type(text)
}
