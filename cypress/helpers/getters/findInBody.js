export async function findInBodyAndDo(elementId, callback) {
  cy.get('body').then((body) => {
    if (body.find(elementId).length > 0) {
      callback()
    }
  })
}
