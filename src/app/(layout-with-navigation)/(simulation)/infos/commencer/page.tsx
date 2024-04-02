'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Trans from '@/components/translation/Trans'
import { getParticipantInscriptionPageVisitedEvent } from '@/constants/matomo/organisations'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useContext, useEffect, useRef, useState } from 'react'
import { InfosContext } from '../_components/InfosProvider'

const titles = {
  notStarted: (
    <>
      <Trans>Envie de connaître votre empreinte carbone ?</Trans>{' '}
      <Emoji>🤓</Emoji>
    </>
  ),
  started: (
    <>
      <Trans>Vous avez déjà commencé le test Nos Gestes Climat !</Trans>{' '}
      <Emoji>💪</Emoji>
    </>
  ),
  finished: (
    <>
      <Trans>Vous avez déjà réalisé le test Nos Gestes Climat !</Trans>{' '}
      <Emoji>👏</Emoji>
    </>
  ),
}
const texts = {
  notStarted: (
    <>
      <Trans>Calculez votre empreinte en</Trans>{' '}
      <span className="font-bold text-primary-700">
        <Trans>10 minutes</Trans>
      </span>{' '}
      <Trans>puis comparez vos résultats à ceux des autres participants.</Trans>{' '}
    </>
  ),
  started: (
    <Trans>
      Vous pouvez reprendre votre test en cours, ou en recommencer un.
    </Trans>
  ),
  finished: (
    <Trans>
      Vous pouvez utiliser vos données existantes, ou recommencer le test.
    </Trans>
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

  const { getCurrentSimulation, updateCurrentSimulation } = useUser()

  const { goToSimulateurPage } = useSimulateurPage()

  const currentSimulation = getCurrentSimulation()

  const [status, setStatus] = useState<
    'notStarted' | 'started' | 'finished' | undefined
  >()

  useEffect(() => {
    if (status) {
      return
    }
    if (!currentSimulation?.progression) {
      setStatus('notStarted')
      return
    }
    if (currentSimulation?.progression === 1) {
      setStatus('finished')
      return
    }
    setStatus('started')
  }, [currentSimulation, status])

  const { handleUpdateShouldPreventNavigation } = useContext(
    PreventNavigationContext
  )

  useEffect(() => {
    handleUpdateShouldPreventNavigation(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentSimulationRef = useRef(currentSimulation)
  const [shouldGoToSimulateurPage, setShouldGoToSimulateurPage] =
    useState(false)
  useEffect(() => {
    if (!shouldGoToSimulateurPage) {
      return
    }
    if (currentSimulationRef.current?.poll !== currentSimulation?.poll) {
      goToSimulateurPage()
    }
    currentSimulationRef.current = currentSimulation
  }, [goToSimulateurPage, shouldGoToSimulateurPage, currentSimulation])

  if (!status) {
    return null
  }

  return (
    <Card className={'items-start border-none bg-grey-100 p-8'}>
      <Title
        data-cypress-id="commencer-title"
        className="text-lg md:text-xl"
        title={titles[status]}
      />

      <p className="mb-8">{texts[status]}</p>

      <div className="flex flex-col items-start gap-6">
        <Button
          onClick={async () => {
            await updateCurrentSimulation({
              defaultAdditionalQuestionsAnswers: {
                postalCode,
                birthdate,
              },
              poll: pollSlug || undefined,
            })

            trackEvent(getParticipantInscriptionPageVisitedEvent('commencer'))

            // We try to go to the simulateur page. If the test is finished we will save the simulation and then go to the end page
            setShouldGoToSimulateurPage(true)
          }}>
          {buttonLabels[status]}
        </Button>

        {status !== 'notStarted' ? (
          <Button
            color="secondary"
            onClick={() => {
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
            <Trans>Commencer un nouveau test</Trans>
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
