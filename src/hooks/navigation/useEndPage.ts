import { EMAIL_PAGE } from '@/constants/organisations/infosPages'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useGoToEndPage() {
  const router = useRouter()

  const currentSimulation = useCurrentSimulation()
  const {
    user: { userId },
  } = useUser()
  const { progression, groups, polls } = currentSimulation

  const goToEndPage = useCallback(() => {
    if (progression !== 1) {
      return
    }

    if ((polls && polls.length > 0) || groups) {
      router.push(EMAIL_PAGE)
      return
    }
    router.push(END_PAGE_PATH)
  }, [progression, polls, groups, router])

  return { goToEndPage }
}
