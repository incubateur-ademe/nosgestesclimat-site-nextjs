import { EMAIL_PAGE } from '@/constants/organisations/infosPages'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { useSaveSimulation } from '../simulation/useSaveSimulation'

export function useGoToEndPage() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const { saveSimulation } = useSaveSimulation()
  const currentSimulation = useCurrentSimulation()

  const { progression, groups, polls } = currentSimulation

  const goToEndPage = useCallback(() => {
    if (progression !== 1) {
      return
    }

    // For slow connections wait for simulation to be saved
    startTransition(async () => {
      await saveSimulation({ simulation: currentSimulation })
    })

    if ((polls && polls.length > 0) || groups) {
      router.push(EMAIL_PAGE)
      return
    }
    router.push(END_PAGE_PATH)
  }, [progression, saveSimulation, currentSimulation, polls, groups, router])

  return { goToEndPage, isPending }
}
