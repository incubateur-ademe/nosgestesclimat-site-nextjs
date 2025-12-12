import type { Page } from '@playwright/test'
import { click } from '../interactions/click'
import { type } from '../interactions/type'

export async function fillGroupNameEmoji(page: Page): Promise<void> {
  await type(page, 'group-name', 'Jean-Marc groupe')
  await click(page, 'group-select-emoji-🍋')
}
