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
  const pathname = `${basePath}${SIMULATOR_PATH}`

  // Use currentSearchParams if available, otherwise create an empty URLSearchParams
  // URLSearchParams is compatible with ReadonlyURLSearchParams
  const searchParams: ReadonlyURLSearchParams =
    currentSearchParams ?? (new URLSearchParams() as ReadonlyURLSearchParams)

  const newParams: Record<string, string | null | undefined> = {}

  if (fromProfile) {
    newParams.fromProfile = 'true'
  }

  // Add question parameter
  if (question) {
    newParams.question = question.replaceAll(' . ', '.').replaceAll(' ', '_')
  }

  // Log params as an object
  return buildUrlWithPreservedParams(pathname, searchParams, newParams)
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
