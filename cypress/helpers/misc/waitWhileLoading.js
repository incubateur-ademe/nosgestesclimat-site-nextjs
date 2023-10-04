export async function waitWhileLoading() {
  cy.get('body').then((body) => {
    if (body.find('[data-cypress-id="loader"]')?.length > 0) {
      // Waiting for rules parsing
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000)
    }
  })
}
