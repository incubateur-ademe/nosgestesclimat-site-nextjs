import { Page } from '@playwright/test'

export async function findInBodyAndDo(
  page: Page,
  selector: string,
  callback: () => Promise<void>
): Promise<void> {
  const body = page.locator('body')
  const element = body.locator(selector)
  const count = await element.count()
  if (count > 0) {
    await callback()
  }
}

