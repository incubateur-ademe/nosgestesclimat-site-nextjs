import { defaultMetric } from '@/constants/metric'
import { linkToQuiz } from '@/helpers/navigation/quizPages'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type GoToEndPageProps = {
  isAllowedToSave?: boolean
  shouldShowQuiz?: boolean
}
const goToEndPagePropsDefault = {
  isAllowedToSave: true,
  shouldShowQuiz: false,
}

type GetLinkToEndPageProps = {
  shouldShowQuiz?: boolean
}
const GetLinkToEndPagePropsDefault = {
  shouldShowQuiz: false,
}

export function useEndPage() {
  const router = useRouter()

  const currentSimulation = useCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  const goToEndPage = useCallback(
    async ({
      isAllowedToSave = true,
      shouldShowQuiz = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      // If we are already navigating, we don't do anything
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      // If the simulation is finished and is in a poll or a group, we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.polls || currentSimulation.groups)
      ) {
        if (currentSimulation.computedResults[defaultMetric].bilan === 0) {
          // Send an error to Sentry
          captureException(
            new Error('useEndPage: computedResults[defaultMetric].bilan === 0')
          )
        }

        await saveSimulation({
          simulation: currentSimulation,
          sendEmail: true,
        })
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
    [isNavigating, progression, currentSimulation, router, saveSimulation]
  )

  const getLinkToEndPage = useCallback(
    ({
      shouldShowQuiz = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault): string => {
      // If we should show the quiz, we redirect to the quiz page
      // TODO: This is maybe in the wrong place. Should check it later
      if (shouldShowQuiz) {
        return linkToQuiz
      }

      // else we return the results page
      return '/fin'
    },
    []
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}
