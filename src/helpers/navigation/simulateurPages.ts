import { SIMULATOR_PATH } from '@/constants/urls/paths'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question?: DottedName
  locale?: string
  fromProfile?: boolean
}

type TutorielProps = {
  locale?: string
}

export const getLinkToSimulateur = ({
  question,
  locale,
  fromProfile,
}: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const params = new URLSearchParams()

  // If no question is provided, we return the base path
  if (!question) {
    if (fromProfile) {
      params.set('fromProfile', 'true')
    }
    const queryString = params.toString()
    return `${basePath}${SIMULATOR_PATH}${queryString ? `?${queryString}` : ''}`
  }

  // Add question parameter
  params.set('question', question.replaceAll(' . ', '.').replaceAll(' ', '_'))

  // Add fromProfile parameter if needed
  if (fromProfile) {
    params.set('fromProfile', 'true')
  }

  return `${basePath}${SIMULATOR_PATH}?${params.toString()}`
}

export const getLinkToTutoriel = ({ locale }: TutorielProps = {}) => {
  const basePath = locale ? `/${locale}` : ''
  return `${basePath}/tutoriel`
}
