export function clickValidateGroupCreation() {
  cy.get('[data-cypress-id="button-validate-create-group"]')
    .should('be.visible')
    .click()
}
