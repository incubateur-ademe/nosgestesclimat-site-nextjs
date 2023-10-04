import {
  DONT_KNOW_BUTTON,
  DO_THE_TEST_LINK,
  NEXT_QUESTION_BUTTON,
  PREVIOUS_QUESTION_BUTTON,
  SEE_RESULTS_LINK,
  SKIP_TUTORIAL_BUTTON,
  UNDERSTOOD_EXPLANATION_BUTTON,
  UNDERSTOOD_LOCALISATION_BUTTON,
} from '../../constants/elements-ids'
import { findInBodyAndDo } from '../getters/findInBody'
import { click } from '../interactions/click'

export function clickUnderstoodExplanationButton() {
  click(UNDERSTOOD_EXPLANATION_BUTTON)
}

export function clickUnderstoodLocalisationButton() {
  click(UNDERSTOOD_LOCALISATION_BUTTON)
}

export function clickSkipTutorialButton() {
  click(SKIP_TUTORIAL_BUTTON)
}

export function skipTutoIfExists() {
  findInBodyAndDo(SKIP_TUTORIAL_BUTTON, clickSkipTutorialButton)
}

export function clickUnderstoodButtonIfExist() {
  findInBodyAndDo(
    UNDERSTOOD_EXPLANATION_BUTTON,
    clickUnderstoodExplanationButton
  )
}

export function clickDontKnowButton() {
  click(DONT_KNOW_BUTTON)
}

export function clickPreviousButton() {
  click(PREVIOUS_QUESTION_BUTTON)
}

export function clickNextButton() {
  click(NEXT_QUESTION_BUTTON)
}

export function clickSeeResultsLink() {
  click(SEE_RESULTS_LINK)
}

export function clickDoTheTestLink() {
  click(DO_THE_TEST_LINK)
}
