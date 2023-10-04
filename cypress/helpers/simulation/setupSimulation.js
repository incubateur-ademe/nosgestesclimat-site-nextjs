import {
  DO_THE_TEST_LINK,
  UNDERSTOOD_LOCALISATION_BUTTON,
} from '../../constants/elements-ids'
import {
  clickSkipTutorialButton,
  clickUnderstoodExplanationButton,
} from '../elements/buttons'
import { click } from '../interactions/click'

export function setupSimulation() {
  click(DO_THE_TEST_LINK) // clickDoTheTestLink()

  click(UNDERSTOOD_LOCALISATION_BUTTON) // clickUnderstoodLocalisationButton()

  clickSkipTutorialButton()

  clickUnderstoodExplanationButton()

  // waitWhileLoading()
}
