import { DottedName } from '@/publicodes-state/types'

type Props = {
  question?: DottedName
}
export const getLinkToSimulateur = ({ question }: Props = {}) => {
  // If no question is provided, we return
  if (!question) {
    return '/simulateur/bilan'
  }
  //
  return `/simulateur/bilan?question=${question
    .replaceAll(' . ', '.')
    .replaceAll(' ', '_')}`
}
