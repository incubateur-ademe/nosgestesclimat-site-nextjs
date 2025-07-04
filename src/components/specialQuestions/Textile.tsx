'use client'

import Question from '@/components/form/Question'
import Trans from '@/components/translation/trans/TransClient'
import { captureSubQuestion } from '@/constants/tracking/posthogTrackers'
import { openSubQuestion } from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import PencilIcon from '../icons/PencilIcon'

type Props = { question: DottedName }

const POSSIBLE_ANSWERS: Record<string, DottedName> = {
  minimum: 'divers . textile . volume . minimum',
  'renouvellement occasionnel':
    'divers . textile . volume . renouvellement occasionnel',
  'accro au shopping': 'divers . textile . volume . accro au shopping',
}

export default function Textile({ question, ...props }: Props) {
  const { numericValue: totalPiecesTextile } = useRule(
    'divers . textile . nombre total'
  )
  const { value: preciseChoice, setValue: setPreciseChoice } = useRule(
    'divers . textile . choix précis'
  )
  const { setValue } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  useEffect(() => {
    if (!preciseChoice || totalPiecesTextile === 0) return

    if (totalPiecesTextile <= 15) {
      setValue(utils.nameLeaf(POSSIBLE_ANSWERS['minimum']))
    }
    if (totalPiecesTextile > 15 && totalPiecesTextile <= 35) {
      setValue(utils.nameLeaf(POSSIBLE_ANSWERS['renouvellement occasionnel']))
    }
    if (totalPiecesTextile > 35) {
      setValue(utils.nameLeaf(POSSIBLE_ANSWERS['accro au shopping']))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preciseChoice, totalPiecesTextile])

  return (
    <>
      <Question
        question={question}
        className={twMerge(
          'mb-4',
          preciseChoice && 'pointer-events-none opacity-20'
        )}
        {...props}
      />
      <div className="flex flex-col items-start text-sm md:flex-row md:items-center">
        <span>
          <Trans>Pour plus de précision:</Trans>
        </span>
        <div>
          <Button
            color="link"
            size="xs"
            onClick={() => {
              trackEvent(openSubQuestion({ question }))
              trackPosthogEvent(
                captureSubQuestion({
                  question,
                  state: preciseChoice ? 'closed' : 'opened',
                })
              )
              setPreciseChoice(preciseChoice ? 'non' : 'oui')

              updateCurrentSimulation({
                foldedStepToAdd: question,
              })
            }}
            className="mt-1 md:mt-0 md:ml-2">
            {preciseChoice ? (
              <Trans>Fermer</Trans>
            ) : (
              <span className="flex items-center">
                <PencilIcon
                  className="stroke-primary-700 mr-2"
                  width="16"
                  height="16"
                />

                <Trans>Je détaille ma garde-robe</Trans>
              </span>
            )}
          </Button>
        </div>
      </div>
      {preciseChoice ? (
        <div className="p-4">
          <Question
            question={'divers . textile . empreinte précise'}
            headingLevel={3}
            {...props}
          />
        </div>
      ) : null}
    </>
  )
}
