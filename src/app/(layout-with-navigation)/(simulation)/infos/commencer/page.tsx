'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'

const titles = {
  notStarted: `Vous n'avez pas encore calculé votre empreinte carbone\u202f!`,
  started: 'Vous avez déjà commencé le test Nos Gestes Climat\u202f!',
  finished: 'Vous avez déjà réalisé le test Nos Gestes Climat\u202f!',
}
const texts = {
  notStarted:
    'Passez le test Nos Gestes Climat, vous aurez la réponse dans 10 minutes.',
  started: 'Vous pouvez reprendre votre test en cours, ou en recommencer un.',
  finished:
    'Vous pouvez utiliser vos données existantes, ou recommencer le test.',
}
const buttonLabels = {
  notStarted: 'Commencer le test',
  started: 'Reprendre le test',
  finished: 'Utiliser mes données existantes',
}

export default function Commencer() {
  const { t } = useClientTranslation()

  const { postalCode, birthdate } = useContext(InfosContext)

  const { pollSlug } = useOrganisationQueryParams()

  const { getCurrentSimulation, initSimulation, updateCurrentSimulation } =
    useUser()

  const currentSimulation = getCurrentSimulation()

  const status = !currentSimulation?.progression
    ? 'notStarted'
    : currentSimulation?.progression === 1
      ? 'finished'
      : 'started'

  return (
    <Card className={'items-start border-none bg-grey-100 pb-8'}>
      <Title
        data-cypress-id="commencer-title"
        className="text-lg md:text-2xl"
        title={t(titles[status])}
      />
      <p>{t(texts[status])}</p>
      <div className="flex flex-col items-start gap-6">
        <ButtonLink
          href="/simulateur/bilan"
          onClick={() => {
            updateCurrentSimulation({
              defaultAdditionalQuestions: {
                postalCode,
                birthdate,
              },
              poll: pollSlug || undefined,
            })
          }}>
          {buttonLabels[status]}
        </ButtonLink>
        {status !== 'notStarted' ? (
          <Link
            href="/simulateur/bilan"
            onClick={() => {
              initSimulation({
                defaultAdditionalQuestions: {
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
