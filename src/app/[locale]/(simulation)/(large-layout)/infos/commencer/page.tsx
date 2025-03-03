'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import TransClient from '@/components/translation/trans/TransClient'
import {
  infosCommencerClickCtaCommencer,
  infosCommencerClickNewTest,
} from '@/constants/tracking/pages/infos'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { usePollQueryParams } from '@/hooks/organisations/usePollQueryParams'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useContext, useEffect, useState } from 'react'
import { InfosContext } from '../_components/InfosProvider'

const titles = {
  notStarted: (
    <span className="flex items-center">
      <TransClient>Envie de connaître votre empreinte carbone ?</TransClient>{' '}
      <Emoji className="ml-1">🤓</Emoji>
    </span>
  ),
  started: (
    <span className="flex items-center">
      <TransClient>
        Vous avez déjà commencé le test Nos Gestes Climat !
      </TransClient>{' '}
      <Emoji className="ml-1">💪</Emoji>
    </span>
  ),
  finished: (
    <span className="flex items-center">
      <TransClient>
        Vous avez déjà réalisé le test Nos Gestes Climat !
      </TransClient>{' '}
      <Emoji className="ml-1">👏</Emoji>
    </span>
  ),
}
const texts = {
  notStarted: (
    <>
      <TransClient>Calculez votre empreinte en</TransClient>{' '}
      <span className="text-primary-700 font-bold">
        <TransClient>10 minutes</TransClient>
      </span>{' '}
      <TransClient>
        puis comparez vos résultats à ceux des autres participants.
      </TransClient>{' '}
    </>
  ),
  started: (
    <TransClient>
      Vous pouvez reprendre votre test en cours, ou en recommencer un.
    </TransClient>
  ),
  finished: (
    <TransClient>
      Vous pouvez utiliser vos données existantes, ou recommencer le test.
    </TransClient>
  ),
}
const buttonLabels = {
  notStarted: <TransClient>Commencer le test</TransClient>,
  started: <TransClient>Reprendre le test</TransClient>,
  finished: <TransClient>Utiliser mes données existantes</TransClient>,
}

export default function Commencer() {
  const { postalCode, birthdate, customAnswers } = useContext(InfosContext)

  const { pollSlug } = usePollQueryParams()

  const { goToSimulateurPage } = useSimulateurPage()

  const { progression, updateCurrentSimulation, polls } = useCurrentSimulation()

  const [status, setStatus] = useState<
    'notStarted' | 'started' | 'finished' | undefined
  >()

  useEffect(() => {
    if (status) {
      return
    }
    if (!progression) {
      setStatus('notStarted')
      return
    }
    if (progression === 1) {
      setStatus('finished')
      return
    }
    setStatus('started')
  }, [progression, status])

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
      goToSimulateurPage()
    }
  }, [goToSimulateurPage, polls, pollSlug, shouldNavigate])

  if (!status) {
    return null
  }

  return (
    <Card className={'items-start border-none bg-gray-100 p-8'}>
      <Title
        data-cypress-id="commencer-title"
        className="text-lg md:text-xl"
        title={titles[status]}
      />

      <p className="mb-8">{texts[status]}</p>

      <div className="flex flex-col items-start gap-6">
        <Button
          onClick={async () => {
            if (status === 'notStarted') {
              trackEvent(infosCommencerClickCtaCommencer)
            }
            if (status === 'started') {
              trackEvent(infosCommencerClickCtaCommencer)
            }
            if (status === 'finished') {
              trackEvent(infosCommencerClickCtaCommencer)
            }

            updateCurrentSimulation({
              defaultAdditionalQuestionsAnswers: {
                postalCode,
                birthdate,
              },
              customAdditionalQuestionsAnswers: customAnswers,
              pollToAdd: pollSlug || undefined,
            })

            // We try to go to the calculateur page. If the test is finished we will save the simulation and then go to the end page
            setShouldNavigate(true)
          }}>
          {buttonLabels[status]}
        </Button>

        {status !== 'notStarted' ? (
          <Button
            color="secondary"
            onClick={() => {
              trackEvent(infosCommencerClickNewTest)

              goToSimulateurPage({
                newSimulation: {
                  defaultAdditionalQuestionsAnswers: {
                    postalCode,
                    birthdate,
                  },
                  polls: [pollSlug || ''],
                },
              })
            }}>
            <TransClient>Commencer un nouveau test</TransClient>
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
