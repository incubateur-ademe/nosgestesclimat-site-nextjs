export function clickNextStepGroupCreation() {
  cy.get('[data-cypress-id="button-continue-create-group"]')
    .should('be.visible')
    .click()
}
