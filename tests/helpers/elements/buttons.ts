import { Page } from '@playwright/test'
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
import { click } from '../interactions/click'

export async function clickUnderstoodExplanationButton(
  page: Page
): Promise<void> {
  await click(page, UNDERSTOOD_EXPLANATION_BUTTON)
}

export async function clickUnderstoodLocalisationButtonIfItExists(
  page: Page
): Promise<void> {
  await click(page, UNDERSTOOD_LOCALISATION_BUTTON)
}

export async function clickSkipTutorialButton(page: Page): Promise<void> {
  await click(page, SKIP_TUTORIAL_BUTTON)
}

export async function skipTutoIfExists(page: Page): Promise<void> {
  await clickSkipTutorialButton(page)
}

export async function clickUnderstoodButtonIfExist(page: Page): Promise<void> {
  await clickUnderstoodExplanationButton(page)
}

export async function clickDontKnowButton(page: Page): Promise<void> {
  await click(page, DONT_KNOW_BUTTON)
}

export async function clickPreviousButton(page: Page): Promise<void> {
  await click(page, PREVIOUS_QUESTION_BUTTON)
}

export async function clickNextButton(page: Page): Promise<void> {
  await click(page, NEXT_QUESTION_BUTTON)
}

export async function clickDoTheTestLink(page: Page): Promise<void> {
  await click(page, DO_THE_TEST_LINK)
}

export async function clickAmisLink(page: Page): Promise<void> {
  await page
    .locator(`[data-cypress-id="${AMIS_LINK}"]`)
    .nth(1)
    .waitFor({ state: 'visible' })
  await page.locator(`[data-cypress-id="${AMIS_LINK}"]`).nth(1).click()
}
