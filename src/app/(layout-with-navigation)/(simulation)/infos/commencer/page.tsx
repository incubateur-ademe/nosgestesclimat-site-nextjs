'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { usePoll } from '@/hooks/organisations/usePoll'
import { useSaveSimulation } from '@/hooks/useSaveSimulation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
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

  const { data: poll } = usePoll({ pollSlug })

  const {
    getCurrentSimulation,
    initSimulation,
    updateCurrentSimulation,
    user,
  } = useUser()

  const router = useRouter()

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
        <Button
          onClick={async () => {
            if (status === 'finished') {
              await saveSimulation({
                simulation: {
                  ...currentSimulation,
                  situation: currentSimulation?.situation ?? {},
                  foldedSteps: currentSimulation?.foldedSteps ?? [],
                  actionChoices: currentSimulation?.actionChoices ?? {},
                  defaultAdditionalQuestionsAnswers: {
                    postalCode,
                    birthdate,
                  },
                  date: new Date(),
                  poll: pollSlug || undefined,
                  userId: user?.id,
                },
                userId: user?.id,
                email: user?.email,
              })
            }

            updateCurrentSimulation({
              defaultAdditionalQuestionsAnswers: {
                postalCode,
                birthdate,
              },
              poll: pollSlug || undefined,
            })

            router.push(
              status === 'finished'
                ? `/organisations/${poll?.organisationInfo?.slug}/resultats-detailles`
                : '/simulateur/bilan'
            )
          }}>
          {buttonLabels[status]}
        </Button>

        {status !== 'notStarted' ? (
          <Link
            href="/simulateur/bilan"
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
