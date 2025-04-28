export function fillGroupCreationFirstStep() {
  cy.get('input[data-cypress-id="group-input-owner-name"]').type('Jean-Marc')
  cy.get('input[data-cypress-id="group-input-owner-email"]').type(
    'jean@marc.com'
  )
}
