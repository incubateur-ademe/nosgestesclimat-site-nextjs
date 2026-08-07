import type { Situation } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Page } from '@playwright/test'
import { TutorialPage, test as base, expect } from './tutorial'

export class NGCTest {
  constructor(
    public readonly page: Page,
    public readonly tutorialPage: TutorialPage = new TutorialPage(page)
  ) {}

  async start() {
    await this.tutorialPage.start()
    await this.tutorialPage.skip()
  }

  private async answerQuestion(situation: Situation) {
    const inputs = this.page.locator('input')
    let isAnswered = false
    for (const input of await inputs.all()) {
      const testId = await input.getAttribute('data-testid')
      if (!testId) {
        continue
      }
      const [dottedName, answer] = testId.split('-')
      if (!(dottedName in situation)) {
        continue
      }
      const value = situation[dottedName as DottedName]

      if (
        typeof value === 'string' &&
        (value === `'${answer}'` || value === answer)
      ) {
        await this.page.getByTestId(`${dottedName}-${answer}-label`).click()
        isAnswered = true
        continue
      }
      if (typeof value === 'number') {
        // Check if there's a switch to select main unit (for questions with assistance)
        const mainUnitSwitch = this.page.getByTestId('switch-main-unit')
        if (await mainUnitSwitch.isVisible()) {
          await mainUnitSwitch.click()
        }
        // @TODO : when copying a number with a "." instead of ",", it removes it
        await this.page
          .getByTestId(dottedName)
          .fill(String(value).replace('.', ','))

        isAnswered = true
        continue
      }
    }
    return isAnswered
  }

  skipButton() {
    return this.page.getByTestId('skip-question-button')
  }

  private endButton() {
    return this.page.getByTestId('end-test-button')
  }

  private async canEndTest() {
    const end = this.endButton()
    // count() first (non-waiting, respects the { visible: true } filter that
    // patches getByTestId) so we never call isEnabled() while only hidden
    // copies of the button remain in the DOM (React <Activity> keeps previous
    // routes mounted), which would wait for the filter forever. isEnabled()
    // is then safe: a visible copy exists. It matters: the end button stays
    // disabled until the current question is folded, and ending too early
    // makes the following click wait for an enabled state that never comes.
    return (await end.count()) > 0 && (await end.isEnabled())
  }

  async isBooleanQuestion() {
    // if boolean question, test id contains "oui" or "non"
    const ouiCount = await this.page.getByTestId(/oui-label/).count()
    const nonCount = await this.page.getByTestId(/non-label/).count()
    return ouiCount === 1 && nonCount === 1
  }

  async isChoicesQuestion() {
    // we consider that if there are more than 3 labels (question label + at least 3 answers), it's a choices question
    const labelInput = await this.page.getByTestId(/-label/).count()
    return labelInput > 3
  }

  async isSelectionMosaic() {
    // we consider that if there are more than 2 oui-label, it's a selection mosaic question
    const labelInput = await this.page.getByTestId(/oui-label/).count()
    return labelInput > 2
  }

  async skipAll() {
    await this.start()
    await this.skipAllQuestions()
  }

  // Clicks the skip button when it is available. Returns true when a click
  // was dispatched. The button is disabled once a question is answered and
  // absent while the app is navigating, in which case callers should wait
  // briefly instead of hot-looping.
  private async clickSkipIfPossible() {
    const skip = this.skipButton()
    // count() first (non-waiting) so isEnabled() is never called while only
    // hidden copies of the button are mounted (React <Activity> cache) — on a
    // { visible: true } filtered locator, isEnabled() would wait forever in
    // that case. Once a visible copy is known to exist, isEnabled() resolves
    // immediately and tells us whether the question can actually be skipped
    // (the skip button is disabled once the question is answered).
    if ((await skip.count()) === 0) {
      return false
    }
    if (!(await skip.isEnabled())) {
      return false
    }
    await skip.click({ timeout: 2000 }).catch(() => undefined)
    return true
  }

  async skipAllQuestions() {
    while (!(await this.canEndTest())) {
      if (await this.clickSkipIfPossible()) {
        continue
      }
      // Navigation in flight or the last question is being folded. Give the
      // UI time to catch up instead of spinning on clicks.
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    // The end button is clickable. Do not wait for the client-side navigation
    // it triggers: the implicit navigation wait can time out when the RSC
    // request stalls. Wait for it explicitly below with a generous timeout
    // instead, so every caller is covered regardless of its own assertion.
    await this.endButton().click({ noWaitAfter: true })
    // End of test: the app either shows the result page or asks for the email
    // first. Wait for either before returning.
    await this.page.waitForURL(/\/(fin|simulateur\/email)/, { timeout: 30_000 })
  }

  async answerTest(situation: Situation) {
    while (!(await this.canEndTest())) {
      const isAnswered = await this.answerQuestion(situation)
      if (!isAnswered) {
        if (await this.clickSkipIfPossible()) {
          continue
        }
        await new Promise((resolve) => setTimeout(resolve, 250))
        continue
      }
      try {
        await this.page
          .getByTestId('next-question-button')
          .click({ timeout: 2000 })
      } catch {
        continue
      }
    }
    await this.endButton().click({ noWaitAfter: true })
    await this.page.waitForURL(/\/(fin|simulateur\/email)/, { timeout: 30_000 })
  }
}

interface NGCPageFixtures {
  ngcTest: NGCTest
}
const test = base.extend<NGCPageFixtures>({
  ngcTest: async ({ page, tutorialPage }, use) => {
    await use(new NGCTest(page, tutorialPage))
  },
})

export { expect, test }
