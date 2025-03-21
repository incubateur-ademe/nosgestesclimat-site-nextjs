describe('Our iframe demo', () => {
  beforeEach(() => {
    cy.visit('/demo-iframe.html')
  })

  it('displays the iframe correctly', () => {
    cy.get('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .find('[data-cypress-id="do-the-test-link"]')
      .should('be.visible')
  })
})

describe('Our iframe simulation demo', () => {
  beforeEach(() => {
    cy.visit('/demo-iframeSimulation.html')
  })

  it('displays the iframe correctly', () => {
    cy.get('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .find('[data-cypress-id="skip-tutorial-button"]')
      .should('be.visible')
  })
})
