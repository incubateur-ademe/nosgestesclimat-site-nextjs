/**
 * Monkey-patches `page.getByTestId` to always filter by `{ visible: true }`.
 *
 * With `cacheComponents`, React <Activity> keeps previous routes in the DOM
 * (hidden via `display: none`). Playwright locators match all elements
 * regardless of visibility, including those from previous routes.
 *
 * @see https://github.com/vercel/next.js/issues/86577
 */
import { test as base } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use) => {
    const original = page.getByTestId.bind(page)
    page.getByTestId = ((id: string | RegExp) =>
      original(id).filter({ visible: true })) as typeof page.getByTestId
    await use(page)
  },
})
