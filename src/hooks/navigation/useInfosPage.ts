import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { usePoll } from '../organisations/usePoll'

/**
 * @returns {getLinkToNextInfosPage} - A function that returns the link to the next infos page
 * based on the current page and the pollSlug in the query params
 */

type Props = {
  curPage: 'tutoriel' | 'email' | 'postalCode' | 'birthdate' | 'start'
}
export function useInfosPage() {
  const searchParams = useSearchParams()
  const queryParamsString = searchParams.toString()

  const { pollSlug } = useOrganisationQueryParams()

  const { data: poll, isLoading } = usePoll({ pollSlug })

  const urlsInfosPages = useMemo(
    () => ({
      tutoriel: `/tutoriel?${queryParamsString}`,
      email: `/infos/email?${queryParamsString}`,
      postalCode: `/infos/codepostal?${queryParamsString}`,
      birthdate: `/infos/naissance?${queryParamsString}`,
      start: `/infos/commencer?${queryParamsString}`,
    }),
    [queryParamsString]
  )

  const getLinkToNextInfosPage = useCallback(
    ({ curPage }: Props): string => {
      // if there is no pollSlug in query param, we return the test link
      if (!pollSlug) {
        return '/simulateur/bilan'
      }

      // if there in no poll and it is not loading, we return the test link
      if (!poll && !isLoading) {
        return '/simulateur/bilan'
      }

      // if there is no poll yet, we return an empty string (it should be handled by the caller component)
      if (!poll) {
        return ''
      }

      // if we are on the tutoriel, we return the email page
      if (curPage === 'tutoriel') {
        return urlsInfosPages.email
      }

      // if we are on the email page and the poll has the postalCode question, we return the postalCode page link
      if (
        curPage === 'email' &&
        poll.defaultAdditionalQuestions.includes('postalCode')
      ) {
        return urlsInfosPages.postalCode
      }

      // if we are on the email or postalCode page and the poll has the birthdate question, we return the birthdate page link
      if (
        (curPage === 'postalCode' || curPage === 'email') &&
        poll.defaultAdditionalQuestions.includes('birthdate')
      ) {
        return urlsInfosPages.birthdate
      }

      // if we are on the start page, we return the test link
      if (curPage === 'start') {
        return '/simulateur/bilan'
      }

      // if there is no additional question, we return the start page link
      return urlsInfosPages.start
    },
    [pollSlug, poll, isLoading, urlsInfosPages]
  )

  const getLinkToPrevInfosPage = useCallback(
    ({ curPage }: Props): string => {
      // if there is no pollSlug in query param, we return the homepage link
      if (!pollSlug) {
        return '/'
      }

      // if there in no poll and it is not loading, we return the homepage link
      if (!poll && !isLoading) {
        return '/'
      }

      // if there is no poll yet, we return an empty string (it should be handled by the caller component)
      if (!poll) {
        return ''
      }

      // if we are on the tutoriel, we return the homepage link
      if (curPage === 'tutoriel') {
        return '/'
      }

      // if we are on the email page, we return the tutoriel page link
      if (curPage === 'email') {
        return urlsInfosPages.tutoriel
      }

      // if we are on the postalCode page, we return the email page link
      if (curPage === 'postalCode') {
        return urlsInfosPages.email
      }

      // if we are on the start page and the poll has the birthdate question, we return the birthdate page link
      if (
        curPage === 'start' &&
        poll.defaultAdditionalQuestions.includes('birthdate')
      ) {
        return urlsInfosPages.birthdate
      }

      // if we are on the start page or the birthdate page and the poll has the postalCode question, we return the postalCode page link
      if (
        (curPage === 'birthdate' || curPage === 'start') &&
        poll.defaultAdditionalQuestions.includes('postalCode')
      ) {
        return urlsInfosPages.postalCode
      }

      // if there is no additional question, we return the start page link
      return urlsInfosPages.email
    },
    [pollSlug, poll, isLoading, urlsInfosPages]
  )

  return { getLinkToNextInfosPage, getLinkToPrevInfosPage }
}
