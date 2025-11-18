import { Page } from '@playwright/test'

export async function visit(page: Page, path: string): Promise<void> {
  // Force french locale, even for Github CI
  const url = `/fr${path}`

  await page.goto(url)
}
