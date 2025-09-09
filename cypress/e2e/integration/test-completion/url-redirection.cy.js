import { clickNextButton } from '../../../helpers/elements/buttons'
import { visit } from '../../../helpers/interactions/visit'
import { setupSimulation } from '../../../helpers/simulation/setupSimulation'

const thirdQuestion = 'transport.deux_roues.usager'

describe('Simulation page', () => {
  it(`should redirect to the last question answered when the "bilan" root is defined`, () => {
    visit(`/`)

    setupSimulation()

    for (let i = 0; i < 2; i++) {
      clickNextButton()
    }

    cy.url().should('includes', `?question=${thirdQuestion}`)

    visit(`/simulateur/bilan?question=logement.surface`)

    cy.url().should('includes', `?question=${thirdQuestion}`)
  })
})
