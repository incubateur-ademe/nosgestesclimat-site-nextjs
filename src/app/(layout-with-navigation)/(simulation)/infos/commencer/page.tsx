'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import {
  infosCommencerClickCtaCommencer,
  infosCommencerClickNewTest,
} from '@/constants/tracking/pages/infos'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useContext, useEffect, useState } from 'react'
import { InfosContext } from '../_components/InfosProvider'

const titles = {
  notStarted: (
    <span className="flex items-center">
      <NGCTrans>Envie de connaître votre empreinte carbone ?</NGCTrans>{' '}
      <Emoji>🤓</Emoji>
    </span>
  ),
  started: (
    <span className="flex items-center">
      <NGCTrans>Vous avez déjà commencé le test Nos Gestes Climat !</NGCTrans>{' '}
      <Emoji>💪</Emoji>
    </span>
  ),
  finished: (
    <span className="flex items-center">
      <NGCTrans>Vous avez déjà réalisé le test Nos Gestes Climat !</NGCTrans>{' '}
      <Emoji>👏</Emoji>
    </span>
  ),
}
const texts = {
  notStarted: (
    <>
      <NGCTrans>Calculez votre empreinte en</NGCTrans>{' '}
      <span className="font-bold text-primary-700">
        <NGCTrans>10 minutes</NGCTrans>
      </span>{' '}
      <NGCTrans>
        puis comparez vos résultats à ceux des autres participants.
      </NGCTrans>{' '}
    </>
  ),
  started: (
    <NGCTrans>
      Vous pouvez reprendre votre test en cours, ou en recommencer un.
    </NGCTrans>
  ),
  finished: (
    <NGCTrans>
      Vous pouvez utiliser vos données existantes, ou recommencer le test.
    </NGCTrans>
  ),
}
const buttonLabels = {
  notStarted: 'Commencer le test',
  started: 'Reprendre le test',
  finished: 'Utiliser mes données existantes',
}

export default function Commencer() {
  const { postalCode, birthdate } = useContext(InfosContext)

  const { pollSlug } = useOrganisationQueryParams()

  const { goToSimulateurPage } = useSimulateurPage()

  const { progression, updateCurrentSimulation } = useCurrentSimulation()

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

            await updateCurrentSimulation({
              defaultAdditionalQuestionsAnswers: {
                postalCode,
                birthdate,
              },
              pollToAdd: pollSlug || undefined,
            })

            // We try to go to the simulateur page. If the test is finished we will save the simulation and then go to the end page
            goToSimulateurPage()
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
                  poll: pollSlug || undefined,
                },
              })
            }}>
            <NGCTrans>Commencer un nouveau test</NGCTrans>
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
