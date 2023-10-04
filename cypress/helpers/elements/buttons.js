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

export async function clickUnderstoodExplanationButton() {
  click(UNDERSTOOD_EXPLANATION_BUTTON)
}

export async function clickUnderstoodLocalisationButton() {
  click(UNDERSTOOD_LOCALISATION_BUTTON)
}

export async function clickSkipTutorialButton() {
  click(SKIP_TUTORIAL_BUTTON)
}

export async function skipTutoIfExists() {
  findInBodyAndDo(SKIP_TUTORIAL_BUTTON, clickSkipTutorialButton)
}

export async function clickUnderstoodButtonIfExist() {
  findInBodyAndDo(
    UNDERSTOOD_EXPLANATION_BUTTON,
    clickUnderstoodExplanationButton
  )
}

export async function clickDontKnowButton() {
  click(DONT_KNOW_BUTTON)
}

export async function clickPreviousButton() {
  click(PREVIOUS_QUESTION_BUTTON)
}

export async function clickNextButton() {
  click(NEXT_QUESTION_BUTTON)
}

export async function clickSeeResultsLink() {
  click(SEE_RESULTS_LINK)
}

export async function clickDoTheTestLink() {
  click(DO_THE_TEST_LINK)
}
