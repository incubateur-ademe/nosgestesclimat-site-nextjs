'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useUser } from '@/publicodes-state'
import { useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'

const titles = {
  notStarted: (
    <>
      <Trans>Envie de connaître votre empreinte carbone ?</Trans>{' '}
      <Emoji>🤓</Emoji>
    </>
  ),
  started: (
    <>
      <Trans>Vous avez déjà commencé le test Nos Gestes Climat&nbsp;!</Trans>{' '}
      <Emoji>💪</Emoji>
    </>
  ),
  finished: (
    <>
      <Trans>Vous avez déjà réalisé le test Nos Gestes Climat&nbsp;!</Trans>{' '}
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

  const {
    getCurrentSimulation,
    initSimulation,
    updateCurrentSimulation,
    user,
  } = useUser()


  const { saveSimulation } = useSaveSimulation()

  const currentSimulation = getCurrentSimulation()

  const status = !currentSimulation?.progression
    ? 'notStarted'
    : currentSimulation?.progression === 1
      ? 'finished'
      : 'started'

  return (
    <Card className={'items-start border-none bg-grey-100 p-8'}>
      <Title
        data-cypress-id="commencer-title"
        className="text-lg md:text-xl"
        title={titles[status]}
      />

      <p className="mb-8">{texts[status]}</p>

      <div className="flex flex-col items-start gap-6">
        <ButtonLink
          href="/simulateur/bilan"
          onClick={() => {
            updateCurrentSimulation({
              defaultAdditionalQuestionsAnswers: {
                postalCode,
                birthdate,
              },
              poll: pollSlug || undefined,
            })
            // We try to go to the simulateur page. If the test is finished we will save the simulation and then go to the end page
            goToSimulateurPage()
          }}>
          {buttonLabels[status]}
        </Button>

        {status !== 'notStarted' ? (
          <Link
            href={getLinkToSimulateur()}
            onClick={() => {
              initSimulation({
                defaultAdditionalQuestionsAnswers: {
                  postalCode,
                  birthdate,
                },
                poll: pollSlug || undefined,
              })
            }}>
            <Trans>Commencer un nouveau test</Trans>
          </Link>
        ) : null}
      </div>
    </Card>
  )
}
