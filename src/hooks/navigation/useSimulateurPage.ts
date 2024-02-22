import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useEndPage } from './useEndPage'

type GoToSimulateurPageProps = {
  noNavigation?: boolean
  newSimulation?: boolean
}
type GetLinkToSimulateurPageProps = {
  newSimulation?: boolean
}
export function useSimulateurPage() {
  const router = useRouter()

  const { getCurrentSimulation, tutorials, initSimulation } = useUser()

  const { goToEndPage } = useEndPage()

  const tutorielSeen = tutorials.testIntro

  const currentSimulation = getCurrentSimulation()

  const progression = currentSimulation?.progression

  const goToSimulateurPage = useCallback(
    async (
      { noNavigation, newSimulation }: GoToSimulateurPageProps = {
        noNavigation: false,
        newSimulation: false,
      }
    ) => {
      // If there is no current simulation (or we wante to force a new one), we init a new simulation
      if (!currentSimulation || newSimulation) {
        initSimulation()
      }

      // If we don't want to navigate, we do nothing
      if (noNavigation) {
        return
      }

      // If the user has completed the test we redirect him to the results page
      if (progression === 1) {
        goToEndPage()
        return
      }

      // If the user has seen the tutoriel we redirect him to the test
      if (tutorielSeen) {
        router.replace('/simulateur/bilan')
        return
      }

      // else we redirect him to the tutoriel page
      router.replace('/tutoriel')
    },
    [
      currentSimulation,
      tutorielSeen,
      router,
      initSimulation,
      progression,
      goToEndPage,
    ]
  )

  const getLinkToSimulateurPage = useCallback(
    (
      { newSimulation }: GetLinkToSimulateurPageProps = { newSimulation: false }
    ) => {
      // If the user has completed the test (and we are not initializing a new one) we return the results page link
      if (progression === 1 && !newSimulation) {
        return '/fin'
      }

      // If the user has seen the tutoriel we return the test page link
      if (tutorielSeen) {
        return '/simulateur/bilan'
      }

      // else we return the tutoriel page link
      return '/tutoriel'
    },
    [tutorielSeen, progression]
  )

  const linkToSimulateurPageLabel = useMemo(() => {
    // If the user has completed the test we return the results page label
    if (progression === 1) {
      return 'Voir les résultats'
    }

    // If the user has seen the tutoriel we return the test page label
    if (tutorielSeen) {
      return 'Reprendre mon test'
    }

    // else we return the tutoriel page label
    return 'Passer le test →'
  }, [tutorielSeen, progression])

  return {
    goToSimulateurPage,
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  }
}
