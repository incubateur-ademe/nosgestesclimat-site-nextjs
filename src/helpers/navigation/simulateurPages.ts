import { SIMULATOR_PATH } from '@/constants/urls/paths'
import { buildUrlWithPreservedParams } from '@/helpers/iframe/preserveIframeParams'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
  question?: DottedName
  locale?: string
  fromProfile?: boolean
  currentSearchParams?: ReadonlyURLSearchParams
}

type TutorielProps = {
  locale?: string
  currentSearchParams?: ReadonlyURLSearchParams
}

export const getLinkToSimulateur = ({
  question,
  locale,
  fromProfile,
  currentSearchParams,
}: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const params = new URLSearchParams(currentSearchParams)
  const pathname = `${basePath}${SIMULATOR_PATH}`

  if (fromProfile) {
    params.set('fromProfile', 'true')
  }

  // If no question is provided, we return the base path
  if (!question) {
    return buildUrlWithPreservedParams(
      pathname,
      params as ReadonlyURLSearchParams
    )
  }

  // Add question parameter
  params.set('question', question.replaceAll(' . ', '.').replaceAll(' ', '_'))

  return buildUrlWithPreservedParams(
    pathname,
    params as ReadonlyURLSearchParams
  )
}

export const getLinkToTutoriel = ({
  locale,
  currentSearchParams,
}: TutorielProps = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const pathname = `${basePath}/tutoriel`

  if (currentSearchParams) {
    return buildUrlWithPreservedParams(pathname, currentSearchParams)
  }

  return pathname
}
