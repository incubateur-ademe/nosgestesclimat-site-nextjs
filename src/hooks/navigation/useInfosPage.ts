import {
  BIRTHDATE_PAGE,
  EMAIL_PAGE,
  POSTAL_CODE_PAGE,
  START_PAGE,
  TUTORIEL_PAGE,
} from '@/constants/infosPages'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { usePollPublicInfo } from '../organisations/usePollPublicInfo'

/**
 * @returns {getLinkToNextInfosPage} - A function that returns the link to the next infos page
 * based on the current page and the pollSlug in the query params
 */

type Props = {
  curPage:
    | typeof BIRTHDATE_PAGE
    | typeof EMAIL_PAGE
    | typeof POSTAL_CODE_PAGE
    | typeof START_PAGE
    | typeof TUTORIEL_PAGE
    | string // Lol
}
export function useInfosPage() {
  const searchParams = useSearchParams()
  const queryParamsString = searchParams.toString()

  const { pollSlug } = useOrganisationQueryParams()

  const { data: poll, isLoading } = usePollPublicInfo({ pollSlug })

  const { customAdditionalQuestions } = poll ?? {
    customAdditionnalQuestions: [],
  }

  const urlsInfosPages = useMemo(() => {
    const pagePaths: Record<string, string> = {
      [TUTORIEL_PAGE]: `/tutoriel?${queryParamsString}`,
      [EMAIL_PAGE]: `/infos/email?${queryParamsString}`,
      [POSTAL_CODE_PAGE]: `/infos/codepostal?${queryParamsString}`,
      [BIRTHDATE_PAGE]: `/infos/naissance?${queryParamsString}`,
    }

    // Add the custom additionnal questions
    customAdditionalQuestions?.forEach(({ isEnabled }, index) => {
      if (!isEnabled) return

      pagePaths[`question-personnalisee-${index + 1}`] =
        `/infos/question-personnalisee-${index + 1}?${queryParamsString}`
    })

    // Add the last path
    pagePaths[START_PAGE] = `/infos/commencer?${queryParamsString}`

    return pagePaths
  }, [queryParamsString, customAdditionalQuestions])

  const getLinkToNextInfosPage = useCallback(
    ({ curPage }: Props): string => {
      // if there is no pollSlug in query param, we return the test link
      if (!pollSlug) {
        return getLinkToSimulateur()
      }

      // if there in no poll and it is not loading, we return the test link
      if (!poll && !isLoading) {
        return getLinkToSimulateur()
      }

      // if there is no poll yet, we return an empty string (it should be handled by the caller component)
      if (!poll) {
        return ''
      }

      // if we are on the tutoriel, we return the email page
      if (curPage === TUTORIEL_PAGE) {
        return urlsInfosPages.email
      }

      // if we are on the email page and the poll has the postalCode question, we return the postalCode page link
      if (
        curPage === EMAIL_PAGE &&
        poll.defaultAdditionalQuestions.includes(POSTAL_CODE_PAGE)
      ) {
        return urlsInfosPages.postalCode
      }

      // if we are on the email or postalCode page and the poll has the birthdate question, we return the birthdate page link
      if (
        (curPage === POSTAL_CODE_PAGE || curPage === EMAIL_PAGE) &&
        poll.defaultAdditionalQuestions.includes(BIRTHDATE_PAGE)
      ) {
        return urlsInfosPages.birthdate
      }

      // If the user isn't on a custom question page
      if (
        customAdditionalQuestions &&
        customAdditionalQuestions.length > 0 &&
        (curPage === POSTAL_CODE_PAGE ||
          curPage === EMAIL_PAGE ||
          curPage === BIRTHDATE_PAGE)
      ) {
        const nextCustomQuestion = 'question-personnalisee-1'
        return urlsInfosPages[nextCustomQuestion]
      }

      if (
        customAdditionalQuestions &&
        customAdditionalQuestions.length > 0 &&
        curPage.includes('question-personnalisee')
      ) {
        const customQuestionIndex = parseInt(curPage.slice(-1))

        const nextCustomQuestionIndex = customQuestionIndex + 1

        const nextCustomQuestion = `question-personnalisee-${nextCustomQuestionIndex}`

        // We get only the enabled questions on this side
        if (customAdditionalQuestions.length >= nextCustomQuestionIndex) {
          return urlsInfosPages[nextCustomQuestion]
        }
      }
      // if we are on the start page, we return the test link
      if (curPage === START_PAGE) {
        return getLinkToSimulateur()
      }
      // if there is no additional question, we return the start page link
      return urlsInfosPages.start
    },
    [pollSlug, poll, isLoading, customAdditionalQuestions, urlsInfosPages]
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
      if (curPage === TUTORIEL_PAGE) {
        return '/'
      }

      // if we are on the email page, we return the tutoriel page link
      if (curPage === EMAIL_PAGE) {
        return urlsInfosPages.tutoriel
      }

      // if we are on the postalCode page, we return the email page link
      if (curPage === POSTAL_CODE_PAGE) {
        return urlsInfosPages.email
      }

      // if we are on the start page and the poll has the birthdate question, we return the birthdate page link
      if (
        curPage === START_PAGE &&
        poll.defaultAdditionalQuestions.includes(BIRTHDATE_PAGE)
      ) {
        return urlsInfosPages.birthdate
      }

      // if we are on the start page or the birthdate page and the poll has the postalCode question, we return the postalCode page link
      if (
        (curPage === BIRTHDATE_PAGE || curPage === START_PAGE) &&
        poll.defaultAdditionalQuestions.includes(POSTAL_CODE_PAGE)
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
