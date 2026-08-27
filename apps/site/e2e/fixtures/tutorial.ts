import { TUTORIAL_PATH } from '@/constants/urls/paths'
import { test as base, expect, type Page } from '@playwright/test'

export class TutorialPage {
  static SKIP_TUTORIAL_BUTTON = 'skip-tutorial-button'
  static URL = '/simulateur/tutoriel'

  constructor(public readonly page: Page) {}

  /**
   * Opens the tutorial, the entry point for first-time visitors. The tutorial
   * then leads to `/simulateur/commencer`, which creates the simulation and
   * redirects to the simulator.
   */
  async start() {
    await this.page.goto(TUTORIAL_PATH)
  }
  async goto() {
    await this.page.goto(TutorialPage.URL)
  }

  async skip() {
    await this.page.getByTestId(TutorialPage.SKIP_TUTORIAL_BUTTON).click()
    await this.page.waitForURL(new RegExp(`^(?!.*${TutorialPage.URL}).*$`))
  }
}

interface TutorialPageFixtures {
  tutorialPage: TutorialPage
}
const test = base.extend<TutorialPageFixtures>({
  tutorialPage: async ({ page }, use) => {
    await use(new TutorialPage(page))
  },
})

export { expect, test }
