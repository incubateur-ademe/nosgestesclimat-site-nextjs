import { defaultMetric } from '@/constants/model/metric'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { linkToQuiz } from '@/helpers/navigation/quizPages'
import { getPartnerFromStorage } from '@/helpers/partners/getPartnerFromStorage'
import { removePartnerFromStorage } from '@/helpers/partners/removePartnerFromStorage'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { postSituation } from '@/services/partners/postSituation'
import { captureException } from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type GoToEndPageProps = {
  isAllowedToSave?: boolean
  allowedToGoToGroupDashboard?: boolean
  shouldShowQuiz?: boolean
}
const goToEndPagePropsDefault = {
  isAllowedToSave: true,
  allowedToGoToGroupDashboard: false,
  shouldShowQuiz: false,
}

type GetLinkToEndPageProps = {
  allowedToGoToGroupDashboard?: boolean
  shouldShowQuiz?: boolean
}
const GetLinkToEndPagePropsDefault = {
  allowedToGoToGroupDashboard: false,
  shouldShowQuiz: false,
}

export function useEndPage() {
  const router = useRouter()

  const currentSimulation = useCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  // Get partner info if they exist
  const partnerParams = getPartnerFromStorage()

  const goToEndPage = useCallback(
    async ({
      isAllowedToSave = true,
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      // If we are already navigating, we don't do anything
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      if (progression === 1 && partnerParams?.partner) {
        try {
          const { redirectUrl } =
            (await postSituation({
              situation: currentSimulation.situation,
              partner: partnerParams.partner,
              partnerParams,
            })) || {}

          // Clear partner state
          removePartnerFromStorage()

          if (redirectUrl) {
            router.push(redirectUrl)
          }
        } catch (error) {
          captureException(error)
        }
      }

      // If the simulation is finished and
      // * is in a poll or a group
      // * has been already saved during the test
      // we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.polls ||
          currentSimulation.groups ||
          // Simulation has already been saved during the test, save it one last time
          // to make sure the the latest version is saved
          currentSimulation.savedViaEmail)
      ) {
        if (currentSimulation.computedResults[defaultMetric].bilan === 0) {
          // Send an error to Sentry
          captureException(
            new Error('useEndPage: computedResults[defaultMetric].bilan === 0')
          )
        }

        saveSimulation({
          simulation: currentSimulation,
          // If the simulation has already been saved via email, we don't send it again
          ...(!currentSimulation.savedViaEmail ? { sendEmail: true } : {}),
        })
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups?.length && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        router.push(getLinkToGroupDashboard({ groupId: lastGroupId }))
        return
      }

      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        router.push(linkToQuiz)
        return
      }

      // else we redirect to the results page
      router.push('/fin')
    },
    [
      isNavigating,
      progression,
      partnerParams,
      currentSimulation,
      router,
      saveSimulation,
    ]
  )

  const getLinkToEndPage = useCallback(
    ({
      allowedToGoToGroupDashboard = false,
      shouldShowQuiz = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault): string => {
      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        return linkToQuiz
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        return getLinkToGroupDashboard({ groupId: lastGroupId })
      }

      // else we return the results page
      return '/fin'
    },
    [currentSimulation]
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}
