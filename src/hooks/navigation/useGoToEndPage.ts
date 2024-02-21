import { formatResultToDetailParam_NEW } from '@/helpers/url/formatResultToDetailParam'
import { useUpdateGroup } from '@/hooks/groups/useUpdateGroup'
import { useSaveSimulation } from '@/hooks/useSaveSimulation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useGoToEndPage() {
  const router = useRouter()

  const { groupToRedirectToAfterTest, getCurrentSimulation, user } = useUser()
  const currentSimulation = getCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const { handleUpdateGroup } = useUpdateGroup()

  const goToEndPage = useCallback(async () => {
    if (!currentSimulation) {
      return '/404' // TODO: should throw an error
    }

    // If the simulation is not finished, we do not save it and just redirect to the results page
    if (progression !== 1) {
      router.push(
        `/fin?${formatResultToDetailParam_NEW({
          simulation: currentSimulation,
        })}`
      )
    }

    // When a user joins a group without having his test passed, we save it and then redirect to the group results page
    // TODO should use currentSimulation.group instead of groupToRedirectToAfterTest
    if (groupToRedirectToAfterTest) {
      const { groupId } = await handleUpdateGroup({
        group: groupToRedirectToAfterTest,
      })
      if (groupId) {
        router.push(`/amis/resultats?groupId=${groupId}`)
        return
      }
    }

    // If the simulation is in a poll, we save it
    if (currentSimulation.poll) {
      await saveSimulation({
        simulation: {
          ...currentSimulation,
          situation: currentSimulation?.situation ?? {},
          foldedSteps: currentSimulation?.foldedSteps ?? [],
          actionChoices: currentSimulation?.actionChoices ?? {},
          date: new Date(),
          userId: user?.id,
        },
        email: user?.email,
        userId: user?.id,
      })
    }

    router.push(
      `/fin?${formatResultToDetailParam_NEW({ simulation: currentSimulation })}`
    )
  }, [
    currentSimulation,
    progression,
    groupToRedirectToAfterTest,
    router,
    handleUpdateGroup,
    saveSimulation,
    user?.id,
    user?.email,
  ])

  return { goToEndPage }
}
