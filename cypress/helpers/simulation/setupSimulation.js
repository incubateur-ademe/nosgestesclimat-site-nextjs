import {
  clickDoTheTestLink,
  clickSkipTutorialButton,
  clickUnderstoodExplanationButton,
  clickUnderstoodLocalisationButton,
} from '../elements/buttons'

export function setupSimulation() {
  clickDoTheTestLink()

  clickUnderstoodLocalisationButton()

  clickSkipTutorialButton()

  clickUnderstoodExplanationButton()
}
