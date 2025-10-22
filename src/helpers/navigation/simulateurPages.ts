import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { buildUrlWithPreservedParams } from '@/helpers/iframe/preserveIframeParams'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
  question?: DottedName
  locale?: string
  currentSearchParams?: ReadonlyURLSearchParams
}

type TutorielProps = {
  locale?: string
}

export const getLinkToSimulateur = ({
  question,
  locale,
  currentSearchParams,
}: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const pathname = `${basePath}${SIMULATOR_PATH}`

  // If no question is provided, we return the base path with preserved params
  if (!question) {
    if (currentSearchParams) {
      return buildUrlWithPreservedParams(pathname, currentSearchParams)
    }
    return pathname
  }

  // Build URL with question param and preserved iframe params
  const questionParam = question.replaceAll(' . ', '.').replaceAll(' ', '_')

  if (currentSearchParams) {
    return buildUrlWithPreservedParams(pathname, currentSearchParams, {
      question: questionParam,
    })
  }

  return `${pathname}?question=${questionParam}`
}

export const getLinkToTutoriel = ({ locale }: TutorielProps = {}) => {
  const basePath = locale ? `/${locale}` : ''
  return `${basePath}/tutoriel`
}
