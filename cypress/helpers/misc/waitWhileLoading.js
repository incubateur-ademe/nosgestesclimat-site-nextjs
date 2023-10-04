export function waitWhileLoading() {
  if (cy.get('body').find('[data-cypress-id="loader"]')?.length > 0) {
    // Waiting for rules parsing
    cy.wait(4000)
  } else return
}
