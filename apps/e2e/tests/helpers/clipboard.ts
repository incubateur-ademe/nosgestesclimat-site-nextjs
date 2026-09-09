import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

/**
 * Reads the clipboard content after clicking on a button.
 *
 * Handles:
 * - Granting clipboard permissions on Chromium
 * - Skipping on WebKit (clipboard read not supported yet)
 *
 * @see https://github.com/microsoft/playwright/issues/13037
 */
export async function copyAndReadClipboard({
  page,
  copyAction,
}: {
  page: Page
  copyAction: () => Promise<void>
}): Promise<string> {
  const browser = page.context().browser()

  if (browser?.browserType().name() === 'chromium') {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
  }

  if (browser?.browserType().name() === 'webkit') {
    test.skip()
  }

  // Reading the clipboard can fail before anything was ever copied (or when the
  // document isn't focused): treat that as "empty" rather than an error.
  const readClipboard = () =>
    page.evaluate(() => navigator.clipboard.readText()).catch(() => '')

  const contentBeforeCopy = await readClipboard()

  await copyAction()

  // `navigator.clipboard.writeText` resolves asynchronously and a click returns
  // as soon as the event is dispatched, so the write may still be in flight
  // here (flaky on Firefox). Read back until the new content lands.
  let clipboardContent = contentBeforeCopy

  await expect
    .poll(async () => {
      clipboardContent = await readClipboard()
      return clipboardContent
    })
    .not.toBe(contentBeforeCopy)

  return clipboardContent
}
