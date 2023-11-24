import {
  AMIS_LINK,
  DONT_KNOW_BUTTON,
  DO_THE_TEST_LINK,
  NEXT_QUESTION_BUTTON,
  PREVIOUS_QUESTION_BUTTON,
  SKIP_TUTORIAL_BUTTON,
  UNDERSTOOD_EXPLANATION_BUTTON,
  UNDERSTOOD_LOCALISATION_BUTTON,
} from '../../constants/elements-ids'
import { findInBodyAndDo } from '../getters/findInBody'
import { click } from '../interactions/click'

export function clickUnderstoodExplanationButton() {
  click(UNDERSTOOD_EXPLANATION_BUTTON)
}

export function clickUnderstoodLocalisationButtonIfItExists() {
  findInBodyAndDo(
    `button[data-cypress-id="${UNDERSTOOD_LOCALISATION_BUTTON}"]`,
    () => click(UNDERSTOOD_LOCALISATION_BUTTON)
  )
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

export function clickDoTheTestLink() {
  click(DO_THE_TEST_LINK)
}

export function clickAmisLink() {
  cy.get(`[data-cypress-id="${AMIS_LINK}"]`).eq(1).click()
}
