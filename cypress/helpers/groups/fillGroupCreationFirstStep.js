export function fillGroupCreationFirstStep() {
  cy.get('input[data-cypress-id="group-input-owner-name"]')
    .should('be.visible')
    .type('Jean-Marc')
  cy.get('input[data-cypress-id="group-input-owner-email"]')
    .should('be.visible')
    .type('jean@marc.com')
}
