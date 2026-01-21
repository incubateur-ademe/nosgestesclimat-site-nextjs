import type { Situation } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { Page } from '@playwright/test'
import { type TutorialPage, test as base, expect } from './tutorial'

export class NGCTest {
  static NEXT_QUESTION_BUTTON = 'next-question-button'

  constructor(
    public readonly page: Page,
    public readonly tutorialPage: TutorialPage
  ) {}

  async goto() {
    await this.tutorialPage.goto()
    await this.tutorialPage.skip()
  }

  async skipAll() {
    await this.goto()
    await this.skipAllQuestions()
  }

  async answerTest(situation: Situation) {
    while (
      (await this.page
        .getByTestId(NGCTest.NEXT_QUESTION_BUTTON)
        .textContent()) !== 'Terminer'
    ) {
      await this.answerQuestion(situation)
    }
    await this.goToNextQuestion()
  }

  async answerQuestion(situation: Situation) {
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
      isAnswered = true

      if (
        typeof value === 'string' &&
        (value === `'${answer}'` || value === answer)
      ) {
        await this.page.getByTestId(`${dottedName}-${answer}-label`).click()
        continue
      }
      if (typeof value === 'number') {
        // @TODO : when copying a number with a "." instead of ",", it removes it
        await this.page
          .getByTestId(dottedName)
          .fill(String(value).replace('.', ','))
        continue
      }
      isAnswered = false
    }
    if (isAnswered) {
      await this.page.getByRole('button', { name: 'Suivant' }).click()
    } else {
      await this.goToNextQuestion()
    }
  }

  async goToNextQuestion() {
    await this.page.getByTestId(NGCTest.NEXT_QUESTION_BUTTON).click()
  }

  async skipAllQuestions() {
    while (
      (await this.page
        .getByTestId(NGCTest.NEXT_QUESTION_BUTTON)
        .textContent()) !== 'Terminer'
    ) {
      await this.goToNextQuestion()
    }

    await this.goToNextQuestion()
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
