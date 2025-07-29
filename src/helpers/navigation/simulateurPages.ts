import { SIMULATOR_PATH } from '@/constants/urls/paths'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question?: DottedName
  locale?: string
}

type TutorielProps = {
  locale?: string
}

export const getLinkToSimulateur = ({ question, locale }: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  // If no question is provided, we return
  if (!question) {
    return `${basePath}${SIMULATOR_PATH}`
  }
  //
  return `${basePath}${SIMULATOR_PATH}?question=${question
    .replaceAll(' . ', '.')
    .replaceAll(' ', '_')}`
}

export const getLinkToTutoriel = ({ locale }: TutorielProps = {}) => {
  const basePath = locale ? `/${locale}` : ''
  return `${basePath}/tutoriel`
}
