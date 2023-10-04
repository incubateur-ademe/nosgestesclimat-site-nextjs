import {
  clickDoTheTestLink,
  clickSkipTutorialButton,
  clickUnderstoodExplanationButton,
} from '../elements/buttons'
import { waitWhileLoading } from '../misc/waitWhileLoading'

export async function setupSimulation() {
  clickDoTheTestLink()

  waitWhileLoading()

  clickSkipTutorialButton()

  clickUnderstoodExplanationButton()
}
