import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { Simulation } from '@/publicodes-state/types'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useClientTranslation } from '../useClientTranslation'
import { useEndPage } from './useEndPage'

type GoToSimulateurPageProps = {
  noNavigation?: boolean
  newSimulation?: Partial<Simulation>
}
const goToSimulateurPagePropsDefault = {
  noNavigation: false,
  newSimulation: undefined,
}
type GetLinkToSimulateurPageProps = {
  newSimulation?: boolean
}
const getLinkToSimulateurPagePropsDefault = {
  newSimulation: false,
}
export function useSimulateurPage() {
  const router = useRouter()

  const { t } = useClientTranslation()

  const { tutorials, initSimulation } = useUser()

  const { goToEndPage, getLinkToEndPage } = useEndPage()

  const tutorielSeen = tutorials.testIntro

  const { progression } = useCurrentSimulation()

  const goToSimulateurPage = useCallback(
    async ({
      noNavigation = false,
      newSimulation = undefined,
    }: GoToSimulateurPageProps = goToSimulateurPagePropsDefault) => {
      // If there is no current simulation (or we want to force a new one), we init a new simulation
      if (newSimulation) {
        initSimulation(newSimulation)
      }

      // If we don't want to navigate, we do nothing
      if (noNavigation) {
        return
      }

      // If the user has completed the test we redirect him to the results page
      if (progression === 1 && !newSimulation) {
        goToEndPage()
        return
      }

      // If the user has seen the tutoriel we redirect him to the test
      if (tutorielSeen) {
        router.replace(getLinkToSimulateur())
        return
      }

      // else we redirect him to the tutoriel page
      router.replace('/tutoriel')
    },
    [tutorielSeen, router, initSimulation, progression, goToEndPage]
  )

  const getLinkToSimulateurPage = useCallback(
    ({
      newSimulation,
    }: GetLinkToSimulateurPageProps = getLinkToSimulateurPagePropsDefault): string => {
      // If the user has completed the test (and we are not initializing a new one) we return the results page link
      if (progression === 1 && !newSimulation) {
        return getLinkToEndPage()
      }

      // If the user has seen the tutoriel we return the test page link
      if (tutorielSeen) {
        return getLinkToSimulateur()
      }

      // else we return the tutoriel page link
      return '/tutoriel'
    },
    [tutorielSeen, progression, getLinkToEndPage]
  )

  const linkToSimulateurPageLabel = useMemo(() => {
    // If the user has completed the test we return the results page label
    if (progression === 1) {
      return t('Voir les résultats')
    }

    // If the user has seen the tutoriel we return the test page label
    if (progression > 0) {
      return t('Reprendre mon test')
    }

    // else we return the tutoriel page label
    return t('Passer le test →')
  }, [progression, t])

  return {
    goToSimulateurPage,
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  }
}
