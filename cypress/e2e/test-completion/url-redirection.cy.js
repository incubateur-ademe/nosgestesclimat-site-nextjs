// const params =
// `loc=${Cypress.env('localisation_param')}&lang=${Cypress.env('language_param')}`
// FIXME: seems to be broken with the localisation param
// ''

import { mainSimulator } from '../../constants/misc'
import { clickNextButton } from '../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'

const thirdQuestion = 'transport.voiture.gabarit'

function goToQuestionAndGet(
  question,
  rootSimulatorURL = mainSimulator,
  mosaicFirstQuestion = ''
) {
  cy.visit(`/simulateur/${rootSimulatorURL}?question=${question}`)

  cy.get(`[id="id-question-${question}${mosaicFirstQuestion}"]`)
}

function shouldRedirectTo(entryPoint, expectedURL, category = mainSimulator) {
  cy.visit(`/simulateur/${category}?question=${entryPoint}`)
  cy.url().should(
    'eq',
    Cypress.config().baseUrl +
      `/simulateur/${category}${expectedURL ? `?question=${expectedURL}` : ''}`
  )
}

// describe('Simulation page', () => {
//   it("should redirect to 'bilan' when an unknow rule is specified for the simulator root rule", () => {
//     cy.visit('/simulateur/unknown')

//     cy.wait(10000)

//     cy.url().should('includes', '/404')
//   })
// })

// ============================================================================
//
// NOTE(@EmileRolley): for now the URL redirection is disabled, so this tests
// are disabled too. However, they are still useful to check the redirection
// logic if we want to re-enable it.
//
// ============================================================================

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

  it(`should redirect to a question without space in the name`, () => {
    cy.visit(`/simulateur/bilan`)

    recursivelyFillSimulation()

    cy.wait(2000)
  })

  it('should redirect to a question without space in the name', () => {
    goToQuestionAndGet('logement.surface')
  })

  it('should redirect to a question with space in the name', () => {
    goToQuestionAndGet('logement.saisie-habitants')
  })

  it('should redirect to a question with more than 2 depth in the name + space in it', () => {
    goToQuestionAndGet('transport.avion.court-courrier.heures-de-vol')
  })

  it('should redirect to a mosaic question', () => {
    goToQuestionAndGet(
      'transport.vacances',
      'bilan',
      '.camping-car.propriétaire'
    )
  })

  it('should redirect to a question within a mosaic', () => {
    shouldRedirectTo('transport.vacances.camping-car.propriétaire')
    shouldRedirectTo('transport.vacances.caravane.propriétaire')
  })

  it("should redirect to the first existing parent rule if the URL doesn't correspond to a parsed rule", () => {
    shouldRedirectTo('logement.appartement.unknown-rule.adaf.adf')
  })

  it("should redirect to the first existing parent rule if the URL doesn't correspond to a parsed rule with a question", () => {
    shouldRedirectTo(
      'transport.voiture.motorisation.thermique',
      'transport.voiture.motorisation'
    )
  })
})
