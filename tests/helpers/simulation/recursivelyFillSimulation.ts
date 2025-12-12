import type { Page } from '@playwright/test'
import { NEXT_QUESTION_BUTTON } from '../../constants/elements-ids'
import { dismissCookieBanner } from '../cookies/dismissCookieBanner'
import { click } from '../interactions/click'

const LAST_QUESTION_ID = 'services sociétaux . question rhétorique-ok'

export async function recursivelyFillSimulation(
  page: Page,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persona: Record<string, any> = {}
): Promise<void> {
  await dismissCookieBanner(page)

  async function answerCurrentQuestion(): Promise<void> {
    const url = page.url()

    // If we're not on a simulation page anymore, we're done
    if (!url.includes('/simulateur/bilan')) {
      return
    }

    // Wait for the page to be fully loaded
    await page.waitForSelector('body', { state: 'visible' })

    // Check if there are any inputs on the page with a reasonable timeout
    const inputLocator = page.locator('input')
    const inputCount = await inputLocator.count()

    // All questions have been answered
    if (inputCount <= 0) {
      return
    }

    // Get the first input to check its attributes
    const firstInput = inputLocator.first()
    const inputAttributes = await firstInput.getAttribute('data-cypress-id')
    const [dottedName, mosaicDottedName] = inputAttributes
      ? inputAttributes.split('---')
      : []

    async function skipQuestion(): Promise<void> {
      await page.locator(`[data-cypress-id="${NEXT_QUESTION_BUTTON}"]`).click()
      await answerCurrentQuestion()
    }

    // Is last question
    if (dottedName === LAST_QUESTION_ID) {
      // Click twice to go to the end page
      await page.locator(`[data-cypress-id="${NEXT_QUESTION_BUTTON}"]`).click()
      await page.locator(`[data-cypress-id="${NEXT_QUESTION_BUTTON}"]`).click()
      return
    }

    // Questions should follow the order of the categories
    // TODO: uncomment this when the AB test on categories order is over
    // checkIfCategoryOrderIsRespected(dottedName)

    const inputType = await firstInput.getAttribute('type')

    // Special case : radios
    if (inputType === 'radio') {
      const [dottedNameWithoutValueSuffix, value] = dottedName.split('-')
      if (persona?.situation?.[dottedNameWithoutValueSuffix] === value) {
        await click(page, `label[data-cypress-id="${dottedName}-label"]`)
      } else if (dottedName !== LAST_QUESTION_ID) {
        await skipQuestion()
        return
      }
    }

    // No value for this persona
    if (!persona?.situation?.[dottedName]) {
      await skipQuestion()
      return
    }

    // Single number input or radio
    if (!mosaicDottedName && persona?.situation?.[dottedName]) {
      const inputLocator = page.locator(
        `input[data-cypress-id="${dottedName}"]`
      )
      await inputLocator.waitFor({ state: 'visible' })
      await inputLocator.fill(String(persona.situation[dottedName]))
    }

    const mosaicChildren = Object.keys(persona?.situation ?? {}).filter(
      (dottedNameKey) => dottedNameKey.includes(mosaicDottedName)
    )

    // Is Mosaic
    if (mosaicChildren.length > 1) {
      for (const mosaicItemDottedName of mosaicChildren) {
        const mosaicInputLocator = page.locator(
          `input[data-cypress-id="${mosaicItemDottedName}---${mosaicDottedName}"]`
        )
        await mosaicInputLocator.waitFor({ state: 'visible' })
        await mosaicInputLocator.fill(
          String(persona.situation[mosaicItemDottedName])
        )
      }
    }

    await page.locator(`[data-cypress-id="${NEXT_QUESTION_BUTTON}"]`).click()

    await page.waitForTimeout(100)

    // Call itself recursively to go to the next question
    await answerCurrentQuestion()
  }

  await answerCurrentQuestion()
}
