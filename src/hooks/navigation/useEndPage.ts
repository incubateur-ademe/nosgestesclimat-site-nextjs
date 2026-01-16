import { defaultMetric } from '@/constants/model/metric'
import { END_PAGE_PATH, POLL_EMAIL_STEP } from '@/constants/urls/paths'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { captureException } from '@sentry/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

interface GoToEndPageProps {
  isAllowedToSave?: boolean
  allowedToGoToGroupDashboard?: boolean
}
const goToEndPagePropsDefault = {
  isAllowedToSave: true,
  allowedToGoToGroupDashboard: false,
}

interface GetLinkToEndPageProps {
  allowedToGoToGroupDashboard?: boolean
}
const GetLinkToEndPagePropsDefault = {
  allowedToGoToGroupDashboard: false,
}

export function useEndPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const currentSimulation = useCurrentSimulation()
  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  const redirectToPollQuestionsIfNecessary = useCallback(() => {
    if (
      progression === 1 &&
      currentSimulation.polls &&
      currentSimulation.polls.length > 0
    ) {
      router.push(
        `${POLL_EMAIL_STEP}?poll=${currentSimulation.polls[currentSimulation.polls.length - 1]}`
      )
      return true
    }
    return false
  }, [currentSimulation.polls, progression, router])

  const goToEndPage = useCallback(
    ({
      isAllowedToSave = true,
      allowedToGoToGroupDashboard = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      // If we are already navigating, we don't do anything
      // TODO: seems to not be useful ? Function is triggered multiple times (at least twice)
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      if (redirectToPollQuestionsIfNecessary()) return

      // If the simulation is finished and
      // * is in a poll or a group
      // * has been already saved during the test
      // we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.groups ||
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
      // else we redirect to the results page
      router.push(
        `${END_PAGE_PATH}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`
      )
    },
    [
      isNavigating,
      redirectToPollQuestionsIfNecessary,
      progression,
      currentSimulation,
      router,
      saveSimulation,
      searchParams,
    ]
  )

  const getLinkToEndPage = useCallback(
    ({
      allowedToGoToGroupDashboard = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault): string => {
      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        return getLinkToGroupDashboard({ groupId: lastGroupId })
      }

      // else we return the results page
      return `${END_PAGE_PATH}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`
    },
    [currentSimulation, searchParams]
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}
