import { click } from '../interactions/click'
import { type } from '../interactions/type'

export function fillGroupNameEmoji() {
  type('group-name', 'Jean-Marc groupe')

  click('group-select-emoji-🍋')
}
