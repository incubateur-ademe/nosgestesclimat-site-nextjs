import { EMAIL_PAGE } from '@/constants/organisations/infosPages'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useEndPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const currentSimulation = useCurrentSimulation()

  const { progression, id, groups, polls } = currentSimulation

  const linkToEndPage = useMemo(() => {
    if (groups?.length) {
      const lastGroupId = groups[groups.length - 1]

      return getLinkToGroupDashboard({ groupId: lastGroupId })
    }

    return `${END_PAGE_PATH.replace(':id', id)}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`
  }, [groups, id, searchParams])

  const goToEndPage = useCallback(() => {
    if (progression !== 1) {
      return
    }

    if ((polls && polls.length > 0) || groups) {
      router.push(EMAIL_PAGE)
      return
    }

    router.push(linkToEndPage)
  }, [progression, groups, polls, router, linkToEndPage])

  return { goToEndPage, linkToEndPage }
}
