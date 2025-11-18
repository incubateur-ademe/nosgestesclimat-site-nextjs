import { SIMULATOR_PATH } from '@/constants/urls/paths'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { ReadonlyURLSearchParams } from 'next/navigation'

type Props = {
  question?: DottedName
  locale?: string
  searchParams?: ReadonlyURLSearchParams
}

type TutorielProps = {
  locale?: string
  searchParams?: ReadonlyURLSearchParams
}

export const getLinkToSimulateur = ({
  question,
  locale,
  searchParams,
}: Props = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const pathname = `${basePath}${SIMULATOR_PATH}`

  // Use currentSearchParams if available, otherwise create an empty URLSearchParams
  // URLSearchParams is compatible with ReadonlyURLSearchParams
  const urlSearchParams = new URLSearchParams(searchParams?.toString() || '')

  // Add question parameter
  if (question) {
    urlSearchParams.set(
      'question',
      question.replaceAll(' . ', '.').replaceAll(' ', '_')
    )
  }

  // Log params as an object
  return `${pathname}${urlSearchParams.size > 0 ? `?${urlSearchParams.toString()}` : ''}`
}

export const getLinkToTutoriel = ({
  locale,
  searchParams,
}: TutorielProps = {}) => {
  const basePath = locale ? `/${locale}` : ''
  const pathname = `${basePath}/tutoriel`

  if (searchParams) {
    return `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`
  }

  return pathname
}
