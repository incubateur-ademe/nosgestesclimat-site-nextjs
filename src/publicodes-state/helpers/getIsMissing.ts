import { DottedName, Situation } from '../types'

type Props = {
  dottedName: DottedName
  situation: Situation
  questionsOfMosaic?: string[]
}

export default function getIsMissing({
  dottedName,
  situation,
  questionsOfMosaic = [],
}: Props): boolean {
  if (situation[dottedName] || situation[dottedName] === 0) {
    return false
  }
  if (
    questionsOfMosaic.find(
      (question) => situation[question] || situation[question] === 0
    )
  ) {
    return false
  }
  return true
}
