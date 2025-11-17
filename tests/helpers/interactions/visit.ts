import { Page } from '@playwright/test'

export async function visit(page: Page, path: string): Promise<void> {
  const testLangURL =
    process.env.PLAYWRIGHT_testLangURL || process.env.testLangURL
  const url = testLangURL ? `/${testLangURL}${path}` : path

  await page.goto(url)
  await page.waitForLoadState('networkidle')
}
