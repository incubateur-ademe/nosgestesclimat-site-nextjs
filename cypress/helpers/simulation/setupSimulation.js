import {
  clickDoTheTestLink,
  clickSkipTutorialButton,
  clickUnderstoodExplanationButton,
  clickUnderstoodLocalisationButton,
} from '../elements/buttons'

export function setupSimulation() {
  clickDoTheTestLink()

  cy.wait(1000)

  clickUnderstoodLocalisationButton()

  cy.wait(1000)

  clickSkipTutorialButton()

  cy.wait(1000)

  clickUnderstoodExplanationButton()
}
