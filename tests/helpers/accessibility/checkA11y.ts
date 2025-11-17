import AxeBuilder from '@axe-core/playwright'
import { Page } from '@playwright/test'
import { CHECK_A11Y_ELEMENTS_EXCLUDED } from '../../constants/accessibility'

export const checkA11y = async (page: Page): Promise<void> => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag21a'])
    .exclude(CHECK_A11Y_ELEMENTS_EXCLUDED)
    .analyze()

  if (results.violations.length > 0) {
    throw new Error(
      `Accessibility violations found: ${JSON.stringify(results.violations, null, 2)}`
    )
  }
}

