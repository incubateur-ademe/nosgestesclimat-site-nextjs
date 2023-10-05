import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

describe('check for test completion', () => {
  before(() => {
    cy.visit('/')

    setupSimulation()
  })

  it('can finish the test with the default values with unspecified search params', () => {
    recursivelyFillSimulation()
  })

  after(() => {
    cy.get('body').then(() => {
      cy.get('div[data-cypress-id="fin-slider"]')
    })
  })
})
