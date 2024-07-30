import { DottedName, Situation } from '../types'

type Props = {
  dottedName: DottedName
  situation: Situation
  questionsOfMosaicFromParent?: DottedName[]
}

export default function getIsMissing({
  dottedName,
  situation,
  questionsOfMosaicFromParent = [],
}: Props): boolean {
  if (situation[dottedName] || situation[dottedName] === 0) {
    return false
  }
  if (
    questionsOfMosaicFromParent.find(
      (question) => situation[question] || situation[question] === 0
    )
  ) {
    return false
  }
  return true
}
