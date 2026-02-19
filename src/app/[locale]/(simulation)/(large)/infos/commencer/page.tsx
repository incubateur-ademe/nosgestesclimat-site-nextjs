'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import Trans from '@/components/translation/trans/TransClient'
import { START_PAGE } from '@/constants/organisations/infosPages'

import { SIMULATOR_PATH } from '@/constants/urls/paths'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { usePollQueryParams } from '@/hooks/organisations/usePollQueryParams'
import { useCurrentSimulation } from '@/publicodes-state'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function Commencer() {
  const router = useRouter()

  const { pollSlug } = usePollQueryParams()

  const { goToSimulateurPage } = useSimulateurPage()

  const { progression, updateCurrentSimulation, polls } = useCurrentSimulation()

  const { getLinkToNextInfosPage } = useInfosPage()

  const { handleUpdateShouldPreventNavigation } = useContext(
    PreventNavigationContext
  )
  useEffect(() => {
    handleUpdateShouldPreventNavigation(true)
  }, [handleUpdateShouldPreventNavigation])

  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    if (shouldNavigate && polls?.includes(pollSlug || '')) {
      setShouldNavigate(false)
      router.push(getLinkToNextInfosPage({ curPage: START_PAGE }))
    }
  }, [
    goToSimulateurPage,
    polls,
    pollSlug,
    shouldNavigate,
    router,
    getLinkToNextInfosPage,
  ])

  useEffect(() => {
    if (typeof progression !== 'undefined' && progression !== 1) {
      router.push(SIMULATOR_PATH)
    }
  }, [progression, router])

  return (
    <Card className={'items-start border-none bg-gray-100 p-8'}>
      <Title
        data-testid="commencer-title"
        className="text-lg md:text-xl"
        title={
          <span className="flex items-center">
            <Trans>Vous avez déjà réalisé le test Nos Gestes Climat !</Trans>{' '}
            <Emoji className="ml-1">👏</Emoji>
          </span>
        }
      />

      <p className="mb-8">
        <Trans>
          Vous pouvez utiliser vos données existantes, ou recommencer le test.
        </Trans>
      </p>

      <div className="flex flex-col items-start gap-6">
        <Button
          onClick={() => {
            updateCurrentSimulation({
              pollToAdd: pollSlug || undefined,
            })

            // We try to go to the calculateur page. If the test is finished we will save the simulation and then go to the end page
            setShouldNavigate(true)
          }}>
          <Trans>Utiliser mes données existantes</Trans>
        </Button>

        <Button
          color="secondary"
          onClick={() => {
            goToSimulateurPage({
              newSimulation: {
                polls: [pollSlug || ''],
              },
            })
          }}>
          <Trans>Commencer un nouveau test</Trans>
        </Button>
      </div>
    </Card>
  )
}
