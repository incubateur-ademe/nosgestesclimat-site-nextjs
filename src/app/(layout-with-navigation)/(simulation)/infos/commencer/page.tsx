'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { usePollId } from '@/hooks/organisations/usePollId'
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
  notStarted: `Passez le test Nos Gestes Climat, vous aurez la réponse dans 10 minutes.`,
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

  const { pollId } = usePollId()

  const { getCurrentSimulation, initSimulation, updateCurrentSimulation } =
    useUser()

  const currentSimulation = getCurrentSimulation()

  const status = !currentSimulation?.progression
    ? 'notStarted'
    : currentSimulation?.progression === 1
      ? 'finished'
      : 'started'

  return (
    <div>
      <Title
        data-cypress-id="commencer-title"
        className="text-lg md:text-2xl"
        title={t(titles[status])}
      />
      <p>{t(texts[status])}</p>
      <ButtonLink
        href="/simulateur/bilan"
        onClick={() => {
          updateCurrentSimulation({
            additionalQuestions: {
              postalCode,
              birthdate,
            },
            poll: pollId || undefined,
          })
        }}>
        {buttonLabels[status]}
      </ButtonLink>
      {status !== 'notStarted' ? (
        <ButtonLink
          color="text"
          href="/simulateur/bilan"
          onClick={() => {
            initSimulation({
              additionalQuestions: {
                postalCode,
                birthdate,
              },
              poll: pollId || undefined,
            })
          }}>
          <Trans>Commencer un nouveau test</Trans>
        </ButtonLink>
      ) : null}
    </div>
  )
}
