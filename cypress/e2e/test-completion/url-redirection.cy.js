import { mainSimulator } from '../../constants/misc'
import { clickNextButton } from '../../helpers/elements/buttons'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

const thirdQuestion = 'transport.voiture.motorisation'

describe('Simulation page', () => {
  it(`should redirect to the last question answered when the "bilan" root is defined`, () => {
    cy.visit(`/`)

    setupSimulation()

    for (let i = 0; i < 3; i++) {
      clickNextButton()
    }

    cy.url().should('includes', `?question=${thirdQuestion}`)

    cy.visit(`/simulateur/${mainSimulator}?question=logement.surface`)

    cy.url().should('includes', `?question=${thirdQuestion}`)
  })
})
