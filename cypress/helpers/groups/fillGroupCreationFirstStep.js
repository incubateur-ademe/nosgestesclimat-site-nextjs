export function fillGroupCreationFirstStep() {
  cy.get('input[data-cypress-id="group-input-owner-name"]').type('Jean-Marc')
  cy.get('input[data-cypress-id="group-input-owner-name"]').type(
    'jean@marc.com'
  )
}
