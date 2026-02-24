import { EMAIL_PAGE } from '@/constants/organisations/infosPages'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { getEndPageLink } from './_utils/getEndPageLink'

export function useEndPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const currentSimulation = useCurrentSimulation()
  const progression = currentSimulation.progression

  const { saveSimulation } = useSaveSimulation()

  const linkToEndPage = useMemo(() => {
    if (currentSimulation.groups?.length) {
      const lastGroupId =
        currentSimulation.groups[currentSimulation.groups.length - 1]

      return getLinkToGroupDashboard({ groupId: lastGroupId })
    }

    return `${getEndPageLink(currentSimulation.id)}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`
  }, [currentSimulation, searchParams])

  const goToEndPage = useCallback(() => {
    if (progression !== 1) {
      return
    }

    if (
      (currentSimulation.polls && currentSimulation.polls.length > 0) ||
      currentSimulation.groups
    ) {
      saveSimulation({
        simulation: currentSimulation,
      })
      router.push(EMAIL_PAGE)
      return
    }

    router.push(linkToEndPage)
  }, [progression, currentSimulation, router, linkToEndPage, saveSimulation])

  return { goToEndPage, linkToEndPage }
}
